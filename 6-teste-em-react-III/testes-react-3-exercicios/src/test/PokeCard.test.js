import axios from "axios";
import Pokecard from "../components/Pokecard";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

jest.mock("axios");

const openModal = jest.fn();

const data = [
  {
    name: "bulbasaur",
    url: "https://pokeapi.co/api/v2/pokemon/1/",
  },
  {
    name: "ivysaur",
    url: "https://pokeapi.co/api/v2/pokemon/2/",
  },
];

const apiResponseMock = {
  data: {
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
  },
};

describe("PokeCard", () => {
  beforeEach(() => {
    axios.mockReset();
  });

  test.skip("Se renderiza os items da requsição", async () => {
    axios.get.mockResolvedValueOnce(apiResponseMock);

    render(<Pokecard />);

    screen.debug();

    await waitFor(() => {});

    screen.debug();
  });

  test.skip("Se está renderizando os elementos", async () => {
    axios.get.mockResolvedValueOnce(apiResponseMock);

    render(<Pokecard />);

    screen.debug();

    await waitFor(() => {
      expect(screen.getByText("bulbasaur")).toBeInTheDocument();
      expect(
        screen.getByRole("img", { name: "bulbasaur" })
      ).toBeInTheDocument();
      expect(screen.getByText("grass")).toBeInTheDocument();
      expect(screen.getByText("poison")).toBeInTheDocument();
    });

    expect(
      screen.getByRole("p", { nome: "Loading..." })
    ).not.toBeInTheDocument();

    screen.debug();

    screen.logTestingPlaygroundURL();
  });
});

test("Se o a função de romover esta funcionando", async () => {
  const user = userEvent.setup();

  axios.get.mockResolvedValueOnce(apiResponseMock);

  render(
    <Pokecard key={data[0].name} url={data[0].url} openModal={openModal} />
  );

  await waitFor(() => {});

  screen.debug();

  const buttonOpenModalMock = screen.getByRole("article");
  //   const buttonOpenModalMock = screen.getByText("bulbasaur");

  await user.click(buttonOpenModalMock);

  expect(openModal).toHaveBeenCalledTimes(1);
  expect(openModal).toBeCalledWith(apiResponseMock.data);
  expect(openModal).toHaveReturned();
});
