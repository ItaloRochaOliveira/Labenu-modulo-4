import React, { useState } from "react";
import styled from "styled-components";
import { create, all } from "mathjs";

const math = create(all);

const CalculatorContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
`;

const Display = styled.div`
  font-size: 48px;
  margin-bottom: 20px;
`;

const ButtonContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-gap: 10px;
`;

const Button = styled.button`
  font-size: 24px;
  padding: 10px;
  border: none;
  border-radius: 5px;
  background-color: #ccc;
  cursor: pointer;
  transition: all 0.2s ease-in-out;

  &:hover {
    background-color: #aaa;
  }
`;

const Calculator = () => {
  const [displayValue, setDisplayValue] = useState("");

  const handleButtonClick = (value) => {
    setDisplayValue(displayValue + value);
  };

  const handleClearButtonClick = () => {
    setDisplayValue("");
  };

  const handleEqualsButtonClick = () => {
    try {
      const result = math.evaluate(displayValue);
      setDisplayValue(result.toString());
    } catch (error) {
      console.error(error);
      setDisplayValue("Error");
    }
  };

  return (
    <CalculatorContainer>
      <Display>{displayValue || 0}</Display>
      <ButtonContainer>
        <Button onClick={() => handleButtonClick("7")}>7</Button>
        <Button onClick={() => handleButtonClick("8")}>8</Button>
        <Button onClick={() => handleButtonClick("9")}>9</Button>
        <Button onClick={() => handleButtonClick("/")}>/</Button>
        <Button onClick={() => handleButtonClick("4")}>4</Button>
        <Button onClick={() => handleButtonClick("5")}>5</Button>
        <Button onClick={() => handleButtonClick("6")}>6</Button>
        <Button onClick={() => handleButtonClick("*")}>*</Button>
        <Button onClick={() => handleButtonClick("1")}>1</Button>
        <Button onClick={() => handleButtonClick("2")}>2</Button>
        <Button onClick={() => handleButtonClick("3")}>3</Button>
        <Button onClick={() => handleButtonClick("-")}>-</Button>
        <Button onClick={() => handleButtonClick("0")}>0</Button>
        <Button onClick={() => handleButtonClick(".")}>.</Button>
        <Button onClick={handleClearButtonClick}>C</Button>
        <Button onClick={() => handleButtonClick("+")}>+</Button>
        <Button onClick={handleEqualsButtonClick}>=</Button>
      </ButtonContainer>
    </CalculatorContainer>
  );
};

export default Calculator;
