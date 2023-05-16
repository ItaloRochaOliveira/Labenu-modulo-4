import { render, screen } from "@testing-library/react";
import ProductCard from "../components/ProductsList/ProductCard";
import userEvent from "@testing-library/user-event";

//criar mocks
const productMock = {
  category: "men's clothing",
  description:
    "Your perfect pack for everyday use and walks in the forest. Stash your laptop (up to 15 inches) in the padded sleeve, your everyday",
  id: 1,
  image: "https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg",
  price: 109.95,
  rating: { count: 120, rate: 3.9 },
  title: "Fjallraven - Fold",
};

//addToCart não tem retorno, enta o jest.fn() vai vazio
const addToCartMock = jest.fn();

//só depois fazer os testes
describe("Componete ProductCard", () => {
  const productCard = () =>
    render(
      <ProductCard
        key={productMock.id}
        product={productMock}
        addToCart={addToCartMock}
      />
    );

  test("renderiazar o componente", () => {
    productCard();

    const title = screen.getByText("Fjallraven - Fold");

    // screen.logTestingPlaygroundURL();

    expect(title).toBeInTheDocument("Fjallraven - Fold");
  });

  test("deve renderizar a imagem, o título, o preço e o botão de comprar", () => {
    productCard();

    // screen.logTestingPlaygroundURL();

    const img = screen.getByRole("img", {
      name: /fjallraven \- fold/i,
    });
    const title = screen.getByRole("heading", {
      name: /fjallraven \- fold/i,
    });
    const price = screen.getByText(/\$109\.95/i);
    const button = screen.getByRole("button", { name: /buy/i });

    expect(img).toBeInTheDocument();
    expect(title).toBeInTheDocument();
    expect(price).toBeInTheDocument();
    expect(button).toBeInTheDocument();
  });

  test("se o botão está sendo apertado", async () => {
    const user = userEvent.setup();

    productCard();

    const buttonBuy = screen.getByRole("button", { name: /buy/i });

    await user.click(buttonBuy);

    //se foi clickado e chamado
    expect(addToCartMock).toBeCalled();
    expect(addToCartMock).toHaveBeenCalled();

    //Garantir que foi chamado uma vez:
    expect(addToCartMock).toBeCalledTimes(1);

    //garatir que o product foi passado como argumento
    expect(addToCartMock).toBeCalledWith(productMock);
  });
});
