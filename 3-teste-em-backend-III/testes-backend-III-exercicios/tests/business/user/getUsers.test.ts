import { ZodError } from "zod";
import { UserBusiness } from "../../../src/business/UserBusiness";
import { GetUsersSchema } from "../../../src/dtos/user/getUsers.dto";
import { BadRequestError } from "../../../src/errors/BadRequestError";
import { USER_ROLES } from "../../../src/models/User";
import { HashManagerMock } from "../../mocks/HashManagerMock";
import { IdGeneratorMock } from "../../mocks/IdGeneratorMock";
import { TokenManagerMock } from "../../mocks/TokenManagerMock";
import { UserDatabaseMock } from "../../mocks/UserDatabaseMock";

describe("Testando getUsers", () => {
  const userBusiness = new UserBusiness(
    new UserDatabaseMock(),
    new IdGeneratorMock(),
    new TokenManagerMock(),
    new HashManagerMock()
  );

  test("deve retornar lista de todos users", async () => {
    const input = GetUsersSchema.parse({
      token: "token-mock-astrodev",
    });

    const output = await userBusiness.getUsers(input);

    expect(output).toHaveLength(2);
    expect(output).toEqual([
      {
        id: "id-mock-fulano",
        name: "Fulano",
        email: "fulano@email.com",
        createdAt: expect.any(String),
        role: USER_ROLES.NORMAL,
      },
      {
        id: "id-mock-astrodev",
        name: "Astrodev",
        email: "astrodev@email.com",
        createdAt: expect.any(String),
        role: USER_ROLES.ADMIN,
      },
    ]);
  });

  test("Deve disparar erro de DTO", async () => {
    expect.assertions(1);
    try {
      const input = GetUsersSchema.parse({
        token: "",
      });

      const output = await userBusiness.getUsers(input);
    } catch (erro) {
      if (erro instanceof ZodError) {
        console.log(erro.issues);
        expect(erro.issues[0].message).toBe(
          "String must contain at least 1 character(s)"
        );
      }
    }
  });

  test("testando erro de token invalido", async () => {
    expect.assertions(2);
    try {
      const input = GetUsersSchema.parse({
        token: "token-mock-aleatorio",
      });

      const output = await userBusiness.getUsers(input);
    } catch (erro) {
      if (erro instanceof BadRequestError) {
        expect(erro.message).toBe("token inválido");
        expect(erro.statusCode).toBe(400);
      }
    }
  });

  test("testando erro de token quando não for admin", async () => {
    expect.assertions(2);
    try {
      const input = GetUsersSchema.parse({
        token: "token-mock-fulano",
      });

      const output = await userBusiness.getUsers(input);
    } catch (erro) {
      if (erro instanceof BadRequestError) {
        expect(erro.message).toBe("somente admins podem acessar");
        expect(erro.statusCode).toBe(400);
      }
    }
  });
});
