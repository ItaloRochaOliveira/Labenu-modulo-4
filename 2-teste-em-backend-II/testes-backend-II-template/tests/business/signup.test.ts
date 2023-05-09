import { UserBusiness } from "../../src/business/UserBusiness";
import { SignupSchema } from "../../src/dtos/user/signup.dto";
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

  test("Se signup retorna o token", async () => {
    const input = SignupSchema.parse({
      name: "Astrodev",
      email: "astrodev@email.com",
      password: "astrodev99",
    });

    const output = await userBusiness.signup(input);

    expect(output).toEqual({
      message: "Cadastro realizado com sucesso",
      token: "token-mock",
    });
  });
});
