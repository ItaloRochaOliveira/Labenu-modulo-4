import { ZodError } from "zod";
import { ProductBusiness } from "../../../src/business/ProductBusiness";
import { CreateProductSchema } from "../../../src/dtos/product/createProduct.dto";
import { BadRequestError } from "../../../src/errors/BadRequestError";
import { IdGeneratorMock } from "../../mocks/IdGeneratorMock";
import { ProductDatabaseMock } from "../../mocks/ProductDatabaseMock";
import { TokenManagerMock } from "../../mocks/TokenManagerMock";

describe("Testando getProducts", () => {
  const productBusiness = new ProductBusiness(
    new ProductDatabaseMock(),
    new IdGeneratorMock(),
    new TokenManagerMock()
  );

  test("Se a função funciona", async () => {
    const input = CreateProductSchema.parse({
      name: "novo-produto",
      price: 30,
      token: "token-mock-astrodev",
    });

    const output = await productBusiness.createProduct(input);

    expect(output).toEqual({
      message: "Producto cadastrado com sucesso",
      product: {
        id: "id-mock",
        name: "novo-produto",
        price: 30,
        createdAt: expect.any(String),
      },
    });
  });

  test("Deve disparar erro de DTO", async () => {
    expect.assertions(1);
    try {
      const input = CreateProductSchema.parse({
        name: 40,
        price: 30,
        token: "token-mock-astrodev",
      });

      const output = await productBusiness.createProduct(input);
    } catch (erro) {
      if (erro instanceof ZodError) {
        console.log(erro.issues);
        expect(erro.issues[0].message).toBe("Expected string, received number");
      }
    }
  });

  test("Erro de token invalido", async () => {
    expect.assertions(2);
    try {
      const input = CreateProductSchema.parse({
        name: "novo-produto",
        price: 30,
        token: "token-mock-aleatorio",
      });

      const output = await productBusiness.createProduct(input);
    } catch (erro) {
      if (erro instanceof BadRequestError) {
        expect(erro.message).toBe("token inválido");
        expect(erro.statusCode).toBe(400);
      }
    }
  });

  test("Deve retornar erro ao tentar criar um produto sem estar logado como admin", async () => {
    expect.assertions(2);
    try {
      const input = CreateProductSchema.parse({
        name: "novo-produto",
        price: 30,
        token: "token-mock-fulano",
      });

      const output = await productBusiness.createProduct(input);
    } catch (erro) {
      if (erro instanceof BadRequestError) {
        expect(erro.message).toBe("somente admins podem acessar");
        expect(erro.statusCode).toBe(400);
      }
    }
  });

  test("Erro caso número informado seja igual ou menor que 0", async () => {
    expect.assertions(2);
    try {
      const input = CreateProductSchema.parse({
        name: "novo-produto",
        price: 0,
        token: "token-mock-astrodev",
      });

      const output = await productBusiness.createProduct(input);
    } catch (erro) {
      if (erro instanceof BadRequestError) {
        expect(erro.message).toBe("preço não pode ser 0 ou negativo");
        expect(erro.statusCode).toBe(400);
      }
    }
  });
});
