import { ZodError } from "zod";
import { ProductBusiness } from "../../../src/business/ProductBusiness";
import { GetProductsSchema } from "../../../src/dtos/product/getProducts.dto";
import { BadRequestError } from "../../../src/errors/BadRequestError";
import { USER_ROLES } from "../../../src/models/User";
import { IdGeneratorMock } from "../../mocks/IdGeneratorMock";
import { ProductDatabaseMock } from "../../mocks/ProductDatabaseMock";
import { TokenManagerMock } from "../../mocks/TokenManagerMock";

describe("Testando getProducts", () => {
  const productBusiness = new ProductBusiness(
    new ProductDatabaseMock(),
    new IdGeneratorMock(),
    new TokenManagerMock()
  );

  test("Se ele retorna todos os produtos", async () => {
    const input = GetProductsSchema.parse({
      token: "token-mock-fulano",
    });

    const output = await productBusiness.getProducts(input);

    expect(output).toEqual([
      {
        createdAt: expect.any(String),
        id: "p001",
        name: "Mouse",
        price: 50,
      },
      {
        createdAt: expect.any(String),
        id: "p002",
        name: "Teclado",
        price: 80,
      },
    ]);
  });

  test("Deve disparar erro de DTO", async () => {
    expect.assertions(1);
    try {
      const input = GetProductsSchema.parse({
        q: 30,
        token: "token-mock-fulano",
      });

      const output = await productBusiness.getProducts(input);
    } catch (erro) {
      if (erro instanceof ZodError) {
        console.log(erro.issues);
        expect(erro.issues[0].message).toBe("Expected string, received number");
      }
    }
  });

  test("Erro caso token seja errado", async () => {
    expect.assertions(2);
    try {
      const input = GetProductsSchema.parse({
        token: "token-mock-invalido",
      });

      const output = await productBusiness.getProducts(input);
    } catch (erro) {
      if (erro instanceof BadRequestError) {
        expect(erro.message).toBe("token inválido");
        expect(erro.statusCode).toBe(400);
      }
    }
  });
});
