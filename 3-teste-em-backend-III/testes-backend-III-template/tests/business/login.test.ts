import { ZodError, any } from "zod";
import { UserBusiness } from "../../src/business/UserBusiness";
import { LoginSchema } from "../../src/dtos/user/login.dto";
import { HashManagerMock } from "../mocks/HashManagerMock";
import { IdGeneratorMock } from "../mocks/IdGeneratorMock";
import { TokenManagerMock } from "../mocks/TokenManagerMock";
import { UserDatabaseMock } from "../mocks/UserDatabaseMock";
import { NotFoundError } from "../../src/errors/NotFoundError";

describe("Testando login", () => {
  const userBusiness = new UserBusiness(
    new UserDatabaseMock(),
    new IdGeneratorMock(),
    new TokenManagerMock(),
    new HashManagerMock()
  );

  test("deve gerar um token ao logar", async () => {
    const input = LoginSchema.parse({
      email: "fulano@email.com",
      password: "fulano123",
    });

    const output = await userBusiness.login(input);

    expect(output).toEqual({
      message: "Login realizado com sucesso",
      token: "token-mock-fulano",
    });
  });

  test("Verificar zod de login", async () => {
    expect.assertions(1);
    try {
      const input = LoginSchema.parse({
        email: 20,
        password: "fulano123",
      });

      await userBusiness.login(input);
    } catch (erro) {
      if (erro instanceof ZodError) {
        console.log(erro.issues);
        expect(erro.issues).toEqual([
          {
            code: "invalid_type",
            expected: "string",
            received: "number",
            path: ["email"],
            message: "Expected string, received number",
          },
        ]);
      }
    }
  });

  test("Teste de erro not found", async () => {
    expect.assertions(2);
    try {
      const input = LoginSchema.parse({
        email: "it@gmail.com",
        password: "fulano123",
      });

      await userBusiness.login(input);
    } catch (erro) {
      if (erro instanceof NotFoundError) {
        expect(erro.message).toBe("'email' não encontrado");
        expect(erro.statusCode).toBe(404);
      }
    }
  });
});
