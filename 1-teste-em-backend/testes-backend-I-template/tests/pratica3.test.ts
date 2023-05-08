/*
Crie o arquivo tests/pratica3.test.ts e desenvolva testes para uma função que recebe dois números e retorna um objeto com duas propriedades:
a soma de ambos
a multiplicação de ambos
*/

import { pratica3 } from "../src/pratica3";

describe("teste da pratica3.ts", () => {
  test("Verificar se entrar dois números e retorna um obj", () => {
    const num1 = 10;
    const num2 = 30;
    const result = pratica3(num1, num2);

    const expectedResult = {
      soma: num1 + num2,
      mult: num1 * num2,
    };

    expect(result).toEqual(expectedResult);
  });
});
