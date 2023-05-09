import { UserBusiness } from "../../src/business/UserBusiness";
import { GetUserIdScheme } from "../../src/dtos/user/getUserId.dto";
import { USER_ROLES } from "../../src/models/User";
import { HashManagerMock } from "../mocks/HashManagerMock";
import { IdGeneratorMock } from "../mocks/IdGeneratorMock";
import { TokenManagerMock } from "../mocks/TokenManagerMock";
import { UserDatabaseMock } from "../mocks/UserDatabaseMock";

describe("Testando getUserId", () => {
  const userBusiness = new UserBusiness(
    new UserDatabaseMock(),
    new IdGeneratorMock(),
    new TokenManagerMock(),
    new HashManagerMock()
  );

  test("Se ele retorna os user solicitado", async () => {
    const input = GetUserIdScheme.parse({
      id: "id-mock-fulano",
      token: "token-mock-astrodev",
    });

    const output = await userBusiness.getUserId(input);

    expect(output).toEqual({
      id: "id-mock-fulano",
      name: "Fulano",
      email: "fulano@email.com",
      createdAt: expect.any(String),
      role: USER_ROLES.NORMAL,
    });
  });
});
