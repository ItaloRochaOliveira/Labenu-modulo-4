import { render, screen } from "@testing-library/react";
import TodoList from "../components/TodoList";
import userEvent from "@testing-library/user-event";

describe("testes do todo list", () => {
  test("deve renderizar o título", () => {
    render(<TodoList />);

    const title = screen.getByText("Todo List");

    expect(title).toBeInTheDocument();
  });

  test("o input deve começar vazio", () => {
    render(<TodoList />);

    // const input = screen.findByPlaceholderText("Enter a todo");

    //com regex
    const input = screen.getByPlaceholderText(/Enter a todo/i);

    expect(input).toHaveValue("");
  });

  test("deve digitar o valor no input", async () => {
    const user = userEvent.setup();

    render(<TodoList />);

    // const input = screen.findByPlaceholderText("Enter a todo");

    //com regex
    const input = screen.getByPlaceholderText(/Enter a todo/i);

    //tambem simulando a pessoa dando enter... :
    await user.type(input, "4002-8922{enter}");

    screen.logTestingPlaygroundURL();

    const todoItemValue = screen.getByText(/4002\-8922/i);

    expect(todoItemValue).toBeInTheDocument();
    expect(input).toHaveValue("");

    // simulando se a pessoa escreveu sem dar enter:
    // await user.type(input, "4002-8922");

    // expect(input).toHaveValue("4002-8922");
  });

  test("deve alterar o status da tarefa", async () => {
    const user = userEvent.setup();

    render(<TodoList />);

    const input = screen.getByPlaceholderText(/Enter a todo/i);

    await user.type(input, "4002-8922{enter}");

    // await user.type(input, "teste{enter}");

    screen.logTestingPlaygroundURL();

    const buttonToggle = screen.getByRole("button", {
      name: /toggle/i,
    });

    await user.click(buttonToggle);

    const todoItemValue = screen.getByText(/4002\-8922/i);

    expect(todoItemValue).toBeInTheDocument();
    expect(input).toHaveValue("");

    expect(todoItemValue).toHaveStyle("text-decoration: line-through");

    await user.click(buttonToggle);

    expect(todoItemValue).toHaveStyle("text-decoration: none");
  });
});
