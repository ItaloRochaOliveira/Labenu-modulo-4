import { UserBusiness } from "../../src/business/UserBusiness";
import { GetUsersSchema } from "../../src/dtos/user/getUsers.dto";
import { LoginSchema } from "../../src/dtos/user/login.dto";
import { USER_ROLES } from "../../src/models/User";
import { HashManagerMock } from "../mocks/HashManagerMock";
import { IdGeneratorMock } from "../mocks/IdGeneratorMock";
import { TokenManagerMock } from "../mocks/TokenManagerMock";
import { UserDatabaseMock } from "../mocks/UserDatabaseMock";

describe("Testando método getUsers", () => {
  const userBusiness = new UserBusiness(
    new UserDatabaseMock(),
    new IdGeneratorMock(),
    new TokenManagerMock(),
    new HashManagerMock()
  );

  test("Testando se getUsers retorna array de users", async () => {
    const input = GetUsersSchema.parse({
      token: "token-mock-astrodev",
    });

    const output = await userBusiness.getUsers(input);

    expect(output).toHaveLength(2);
    expect(output).toContainEqual({
      id: "id-mock-astrodev",
      name: "Astrodev",
      email: "astrodev@email.com",
      createdAt: expect.any(String),
      role: USER_ROLES.ADMIN,
    });
  });
});