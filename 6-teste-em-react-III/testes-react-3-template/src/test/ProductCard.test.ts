import axios from "axios";

jest.mock("axios");

const AxiosResponseMock = {
  data: {
    title: "MacBook Pro",
    description:
      "MacBook Pro 2021 with mini-LED display may launch between September, November",
  },
  price: 1749,
  thumbnail: "https://i.dummyjson.com/data/products/6/thumbnail.png",
};

describe("ProductCard", () => {
  beforeEach(() => {
    axios.mockReset();
  });

  test("renderizar a pagina", async () => {
    axios.get.mockResolvedValueOnce(AxiosResponseMock);
  });
});
