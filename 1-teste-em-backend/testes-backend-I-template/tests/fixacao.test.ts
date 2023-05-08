import { fixacao } from "../src/fixacao";

describe("testando o exercicio de fixação", () => {
  test("Verificando se a função funciona", () => {
    const string = "italo";

    const stringSeparada = fixacao(string);

    const stringEsperada = ["i", "t", "a", "l", "o"];

    expect(stringSeparada).toEqual(stringEsperada);
  });

  test("Verificando se a função só entra array", () => {
    const string = 21;

    const stringSeparada = fixacao(string as any);

    expect(stringSeparada).toBeNull;
  });

  test("Verificando se a função só sai array", () => {
    const string = "italo";

    const stringSeparada = fixacao(string);

    expect(stringSeparada).toEqual(Array<string>);
  });
});
