import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Cart from "../components/Cart/Cart";
import CartCard from "../components/Cart/CartCard";

const productMock = {
  category: "men's clothing",
  description:
    "Your perfect pack for everyday use and walks in the forest. Stash your laptop (up to 15 inches) in the padded sleeve, your everyday",
  id: 1,
  image: "https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg",
  price: 109.95,
  quantity: 1,
  rating: { count: 120, rate: 3.9 },
  title: "Fjallraven - Fold",
};

const removeToCartMock = jest.fn();

describe("Testando o componente Cart", () => {
  const CartRender = () =>
    render(
      <CartCard
        key={productMock.id}
        product={productMock}
        removeFromCart={removeToCartMock}
      />
    );

  test("Se está renderizando", () => {
    CartRender();

    // screen.logTestingPlaygroundURL();

    const img = screen.getByRole("img", {
      name: /fjallraven \- fold/i,
    });
    const title = screen.getByRole("heading", {
      name: /fjallraven \- fold/i,
    });
    const price = screen.getByText(/\$109\.95/i);
    // const quantity = screen
    const button = screen.getByRole("button", {
      name: /remove/i,
    });

    expect(img).toBeInTheDocument();
    expect(title).toBeInTheDocument();
    expect(price).toBeInTheDocument();
    expect(button).toBeInTheDocument();
  });

  test("Se o botão de remover funciona", async () => {
    const user = userEvent.setup();

    CartRender();

    const button = screen.getByRole("button", {
      name: /remove/i,
    });

    await user.click(button);

    expect(removeToCartMock).toBeCalledWith(productMock);
  });
});
