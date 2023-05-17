import axios from "axios";
import { render, screen, waitFor } from "@testing-library/react";
import ProductCard from "../components/ProductCard";

jest.mock("axios");

const axiosResponseMock = {
  data: {
    title: "MacBook Pro",
    description: "Um notebook",
    price: 1749,
    thumbnail: "https://i.dummyjson.com/data/products/6/thumbnail.png",
  },
};

describe("ProductCard", () => {
  beforeEach(() => {
    axios.mockReset();
  });

  test("renderizar a pagina", async () => {
    axios.get.mockResolvedValueOnce(axiosResponseMock);

    render(<ProductCard />);

    screen.debug();

    await waitFor(() => {});

    screen.debug();
  });

  test("renderiza a mensagem de carregamento", async () => {
    axios.get.mockResolvedValueOnce(axiosResponseMock);

    render(<ProductCard />);

    screen.debug();

    expect(screen.getByText("Loading...")).toBeInTheDocument();
    expect(screen.queryByText("Bananinha")).not.toBeInTheDocument();

    await waitFor(() => {});

    screen.debug();
  });

  test.only("Verificar se ele renderiza o comp com valores", async () => {
    axios.get.mockResolvedValueOnce(axiosResponseMock);

    render(<ProductCard />);

    screen.debug;

    await waitFor(() => {
      expect(screen.getByText("MacBook Pro")).toBeInTheDocument();
      expect(screen.getByText("Um notebook")).toBeInTheDocument();
      expect(screen.getByText("$1749")).toBeInTheDocument();
      expect(screen.getByRole("img", { name: /Thumbnail for MacBook Pro/i }));
    });

    expect(screen.getByText("Loading...")).not.toBeInTheDocument();

    screen.debug();
  });
});
