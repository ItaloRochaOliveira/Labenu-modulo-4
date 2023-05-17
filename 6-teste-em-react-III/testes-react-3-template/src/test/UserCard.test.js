import { getByText, render, screen, waitFor } from "@testing-library/react";
import UserCard from "../components/UserCard";
import axios from "axios";

jest.mock("axios");

const responseAxiosMock = {
  data: {
    firstName: "it",
    lastName: "Programer",
    bank: {
      cardNumber: "4002-8922",
      cardExpire: "05/2024",
    },
  },
};

describe("UserCard", () => {
  beforeEach(() => {
    axios.mockReset();
  });

  test("Se está renderizando", async () => {
    axios.get.mockResolvedValueOnce(responseAxiosMock);

    render(<UserCard />);

    screen.debug();

    await waitFor(() => {});

    screen.debug();
  });

  test.only("Remover o loading e se está renderizando os valores", async () => {
    axios.get.mockResolvedValueOnce(responseAxiosMock);

    render(<UserCard />);

    screen.debug();

    await waitFor(() => {
      expect(screen.getByText("it Programer")).toBeInTheDocument();
      expect(screen.getByText("4002 -892 2")).toBeInTheDocument();
      expect(screen.getByText("05/2024")).toBeInTheDocument();
    });

    // expect(screen.getByText("Loading...")).not.toBeInTheDocument();

    screen.debug();
  });
});
