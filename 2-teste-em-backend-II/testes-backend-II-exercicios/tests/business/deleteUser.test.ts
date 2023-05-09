import { UserBusiness } from "../../src/business/UserBusiness";
import { deleteSchema } from "../../src/dtos/user/deleteUser.dto";
import { HashManagerMock } from "../mocks/HashManagerMock";
import { IdGeneratorMock } from "../mocks/IdGeneratorMock";
import { TokenManagerMock } from "../mocks/TokenManagerMock";
import { UserDatabaseMock } from "../mocks/UserDatabaseMock";

describe("Testando deleteUsers", () => {
  const userBusiness = new UserBusiness(
    new UserDatabaseMock(),
    new IdGeneratorMock(),
    new TokenManagerMock(),
    new HashManagerMock()
  );

  test("Teste se user é excluido", async () => {
    const input = deleteSchema.parse({
      id: "id-mock-fulano",
      token: "token-mock-astrodev",
    });

    const output = await userBusiness.deleteUser(input);

    expect(output).toEqual({ message: "usuário excluido com sucesso!" });
  });
});
