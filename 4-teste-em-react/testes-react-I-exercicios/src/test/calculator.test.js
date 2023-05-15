import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Calculator from "../components/Calculator";

describe("testando a calculador", () => {
  test("exercicio 1 - testando se +, -, * e / estão sendo clicadas", async () => {
    const user = userEvent.setup();

    render(<Calculator />);

    const soma = screen.getByText("+");
    const subtrair = screen.getByText("-");
    const multiplicar = screen.getByText("*");
    const dividir = screen.getByText("/");

    await user.click(soma);
    await user.click(subtrair);
    await user.click(multiplicar);
    await user.click(dividir);

    // screen.logTestingPlaygroundURL();

    expect(soma).toBeInTheDocument();
    expect(subtrair).toBeInTheDocument();
    expect(multiplicar).toBeInTheDocument();
    expect(dividir).toBeInTheDocument();
  });

  test("exercicio 2 - Garanta em pelo menos um teste que concatenar operações está funcionando corretamente", async () => {
    const user = userEvent.setup();

    render(<Calculator />);

    const cinco = screen.getByText("5");
    const multiplicador = screen.getByText("*");
    const dois = screen.getByText("2");
    const resultado = screen.getByText("=");

    await user.click(cinco);
    await user.click(multiplicador);
    await user.click(dois);
    await user.click(resultado);

    const inputResult = screen.getByText("10");

    // screen.logTestingPlaygroundURL();

    expect(inputResult).toBeInTheDocument("10");
  });

  test("exercicio 3 - Garanta em pelo menos um teste que concatenar operações está funcionando corretamente", async () => {
    const user = userEvent.setup();

    render(<Calculator />);

    const cinco = screen.getByText("5");
    const multiplicador = screen.getByText("*");
    const dois = screen.getByText("2");
    const soma = screen.getByText("+");
    const um = screen.getByText("1");
    const zeros = screen.getAllByText("0");
    const zero = zeros[1];
    const resultado = screen.getByText("=");

    await user.click(cinco);
    await user.click(multiplicador);
    await user.click(dois);
    await user.click(soma);
    await user.click(um);
    await user.click(zero);
    await user.click(resultado);

    const inputResult = screen.getByText("20");
    // screen.logTestingPlaygroundURL();

    expect(inputResult).toBeInTheDocument("20");
  });

  test("desafio 1 - os dígitos númericos também renderizam corretamente", async () => {
    const user = userEvent.setup();

    render(<Calculator />);

    const zero = screen.getByRole("button", {
      name: /0/i,
    });
    const um = screen.getByText("1");
    const dois = screen.getByText("2");
    const tres = screen.getByText("3");
    const quatro = screen.getByText("4");
    const cinco = screen.getByText("5");
    const seis = screen.getByText("6");
    const sete = screen.getByText("7");
    const oito = screen.getByText("8");
    const nove = screen.getByText("9");

    await user.click(zero);
    await user.click(um);
    await user.click(dois);
    await user.click(tres);
    await user.click(quatro);
    await user.click(cinco);
    await user.click(seis);
    await user.click(sete);
    await user.click(oito);
    await user.click(nove);

    const inputResult = screen.getByText("0123456789");

    screen.logTestingPlaygroundURL();

    expect(inputResult).toBeInTheDocument("0123456789");
  });
});
