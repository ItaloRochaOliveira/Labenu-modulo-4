import { ZodError } from "zod";
import { UserBusiness } from "../../../src/business/UserBusiness";
import { LoginSchema } from "../../../src/dtos/user/login.dto";
import { BadRequestError } from "../../../src/errors/BadRequestError";
import { NotFoundError } from "../../../src/errors/NotFoundError";
import { HashManagerMock } from "../../mocks/HashManagerMock";
import { IdGeneratorMock } from "../../mocks/IdGeneratorMock";
import { TokenManagerMock } from "../../mocks/TokenManagerMock";
import { UserDatabaseMock } from "../../mocks/UserDatabaseMock";

describe("Testando login", () => {
  const userBusiness = new UserBusiness(
    new UserDatabaseMock(),
    new IdGeneratorMock(),
    new TokenManagerMock(),
    new HashManagerMock()
  );

  test("deve gerar token ao logar", async () => {
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

  test("Deve disparar erro de DTO", async () => {
    expect.assertions(1);
    try {
      const input = LoginSchema.parse({
        email: "",
        password: "fulano123",
      });

      const output = await userBusiness.login(input);
    } catch (erro) {
      if (erro instanceof ZodError) {
        console.log(erro.issues);
        expect(erro.issues[0].message).toBe("Invalid email");
      }
    }
  });

  test("Erro de email não encontrado", async () => {
    try {
      const input = LoginSchema.parse({
        email: "it@email.com",
        password: "fulano123",
      });

      const output = await userBusiness.login(input);
    } catch (erro) {
      if (erro instanceof NotFoundError) {
        expect(erro.message).toBe("'email' não encontrado");
        expect(erro.statusCode).toBe(404);
      }
    }
  });

  test("Erro de email e senha errado", async () => {
    try {
      const input = LoginSchema.parse({
        email: "fulano@email.com",
        password: "fulano1234",
      });

      const output = await userBusiness.login(input);
    } catch (erro) {
      if (erro instanceof BadRequestError) {
        expect(erro.message).toBe("'email' ou 'password' incorretos");
        expect(erro.statusCode).toBe(400);
      }
    }
  });
});
