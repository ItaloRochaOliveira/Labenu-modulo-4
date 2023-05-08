import { pratica2 } from "../src/pratica2";

describe("teste para prática2.ts", () => {
  //suites

  test("verfificar se o número é do tipo number", () => {
    const result = pratica2("10" as any);

    expect(result).toBeNull();
    //ou
    //expect(result).toBe(null)
    //expect(result).toEqual(null) result === null
  });

  test("verifica se o número não é inteiro, retornar null", () => {
    const result = pratica2(10.5);

    expect(result).toBeNull();
  });

  test("verifica se a entrada é par", () => {
    const result = pratica2(10);

    expect(result).toBe(true);
  });

  test("verifica se a entrada é impar", () => {
    const result = pratica2(11);

    expect(result).toBe(false);
  });
});
