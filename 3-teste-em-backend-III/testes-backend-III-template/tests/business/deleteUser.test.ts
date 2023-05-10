import { ZodError } from "zod";
import { UserBusiness } from "../../src/business/UserBusiness";
import { DeleteUserSchema } from "../../src/dtos/user/deleteUser.dto";
import { HashManagerMock } from "../mocks/HashManagerMock";
import { IdGeneratorMock } from "../mocks/IdGeneratorMock";
import { TokenManagerMock } from "../mocks/TokenManagerMock";
import { UserDatabaseMock } from "../mocks/UserDatabaseMock";
import { BadRequestError } from "../../src/errors/BadRequestError";

describe("Testando deleteUser", () => {
  const userBusiness = new UserBusiness(
    new UserDatabaseMock(),
    new IdGeneratorMock(),
    new TokenManagerMock(),
    new HashManagerMock()
  );

  test("deve deletar user", async () => {
    const input = DeleteUserSchema.parse({
      idToDelete: "id-mock-fulano",
      token: "token-mock-fulano",
    });

    const output = await userBusiness.deleteUser(input);

    expect(output).toEqual({
      message: "Deleção realizada com sucesso",
    });
  });

  test("Ver se erro zod dispara erro caso não passe um valor", async () => {
    expect.assertions(2);
    try {
      const input = DeleteUserSchema.parse({
        idToDelete: "id-mock-fulano",
        token: "",
      });

      const output = await userBusiness.deleteUser(input);
    } catch (erro) {
      if (erro instanceof ZodError) {
        console.log(erro.issues);

        expect(erro.issues).toEqual([
          {
            code: "too_small",
            minimum: 1,
            type: "string",
            inclusive: true,
            exact: false,
            message: "String must contain at least 1 character(s)",
            path: ["token"],
          },
        ]);
        expect(erro.issues[0].message).toBe(
          "String must contain at least 1 character(s)"
        );
      }
    }
  });

  test("Se BadRequest retorna erro com id errada", async () => {
    expect.assertions(1);
    // try {
    // const input = DeleteUserSchema.parse({
    //   idToDelete: "id-mock-astrodev",
    //   token: "token-mock-fulano",
    // });

    // const output = await userBusiness.deleteUser(input);
    // } catch (erro) {
    //   console.log(erro);
    //   if (erro instanceof BadRequestError) {
    //     expect(erro.message).toBe("somente quem criou a conta pode deletá-la");
    //     expect(erro.statusCode).toBe(400);
    //   }
    // }

    //ou

    expect(async () => {
      const input = DeleteUserSchema.parse({
        idToDelete: "id-mock-astrodev",
        token: "token-mock-fulano",
      });

      const output = await userBusiness.deleteUser(input);
    }).rejects.toThrowError(
      new BadRequestError("somente quem criou a conta pode deletá-la")
    );
  });
});
