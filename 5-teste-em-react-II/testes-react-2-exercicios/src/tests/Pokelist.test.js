import { render, screen } from "@testing-library/react";
import Modal from "../components/Modal";
import userEvent from "@testing-library/user-event";
//mocks
const closeModalMock = jest.fn();

// const pokeMock = {
//   imageUrl:
//     "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png",
//   pokemonNumber: 1,
//   pokemonTypes: [
//     { name: "grass", url: "https://pokeapi.co/api/v2/type/12/" },

//     { name: "poison", url: "https://pokeapi.co/api/v2/type/4/" },
//   ],
// };

const activeModalMock = {
  sprites: {
    front_default:
      "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png",
  },
  name: "bulbasaur",
  pokeNumber: 1,
  types: [
    { type: { name: "grass", url: "https://pokeapi.co/api/v2/type/12/" } },
    { type: { name: "poison", url: "https://pokeapi.co/api/v2/type/4/" } },
  ],
  weight: 69,
  height: 7,
};

// const axiosResponse = [
//   {
//     name: "bulbasaur",
//     url: "https://pokeapi.co/api/v2/pokemon/1/",
//   },
//   {
//     name: "ivysaur",
//     url: "https://pokeapi.co/api/v2/pokemon/2/",
//   },
// ];

describe("Testando o componente Pokelist", () => {
  test("Testando componente Modal", () => {
    render(<Modal activeModal={activeModalMock} closeModal={closeModalMock} />);

    // screen.logTestingPlaygroundURL();
  });

  test("Se a função de fechar modal está funcionando", async () => {
    const user = userEvent.setup();

    render(<Modal activeModal={activeModalMock} closeModal={closeModalMock} />);

    const buttonCloseModelMock = screen.getByRole("button", {
      name: /❌/i,
    });

    await user.click(buttonCloseModelMock);

    expect(closeModalMock).toBeCalled();
  });

  //   test("Testando se o componente PokeCard está renderizando", () => {
  //     render(
  //       <Pokecard
  //         key={axiosResponse.name}
  //         name={axiosResponse.name}
  //         url={axiosResponse.url}
  //         openModal={openModalMock}
  //       />
  //     );
  //   });
});
