import React from "react";
import useStore from "../../state/store";
import {
  ButtonContainer,
  CalcNumberButton,
  CalcOperatorButton,
  CalcFunctionButton,
} from "./StyledButtons";
import { LIST_OF_NUMBERS, LIST_OF_OPERATIONS } from "../../state/constants";

const CalcButtons = (arr: any) => {
  const setEquation = useStore((state) => state.setEquation);
  const setOperand = useStore((state) => state.setOperand);
  const addOperand = useStore((state) => state.addOperand);
  const evaluateEquation = useStore((state) => state.evaluateEquation);
  const clearCalculator = useStore((state) => state.clearCalculator);
  const deleteLastInput = useStore((state) => state.deleteLastInput);
  const setPreviousInput = useStore((state) => state.setPreviousInput);
  const setPreviousEquation = useStore((state) => state.setPreviousEquation);
  const setPreviousCalculations = useStore((state) => state.setPreviousCalculations);

  const updatePreviousCalculations = () => {
    const currentEquation = useStore.getState().currentEquation;
    const previousEquation = useStore.getState().previousEquation;
    const previousCalculations = useStore.getState().previousCalculations;

    if (previousCalculations.length === 10) {
      previousCalculations.pop();
      previousCalculations.unshift([previousEquation, currentEquation]);
    } else {
      previousCalculations.unshift([previousEquation, currentEquation]);
    }
    setPreviousCalculations(previousCalculations);
  };

  const checkFunction = (buttonValue: string) => {
    const currentEquation = useStore.getState().currentEquation;

    if (buttonValue === "=") {
      setPreviousEquation(currentEquation.concat(" ", "="));
      evaluateEquation();
      updatePreviousCalculations();
    } else if (buttonValue === "DEL") {
      deleteLastInput();
      setPreviousInput(currentEquation.substring(currentEquation.length - 1));
    } else if (buttonValue === "AC") {
      clearCalculator();
      setPreviousEquation("");
      setPreviousCalculations([]);
    }
  };

  return (
    <ButtonContainer>
      {arr.arr.map((arrVal: any) => {
        if (LIST_OF_NUMBERS.includes(arrVal)) {
          return (
            <CalcNumberButton
              key={arrVal}
              value={arrVal}
              onClick={(e) => {
                setEquation(e.currentTarget.value);
                setPreviousInput(e.currentTarget.value);
              }}
            >
              {arrVal}
            </CalcNumberButton>
          );
        } else if (LIST_OF_OPERATIONS.includes(arrVal)) {
          return (
            <CalcOperatorButton
              key={arrVal}
              value={arrVal}
              onClick={(e) => {
                setOperand(e.currentTarget.value);
                addOperand(e.currentTarget.value);
                setPreviousInput(e.currentTarget.value);
              }}
            >
              {arrVal}
            </CalcOperatorButton>
          );
        } else {
          return (
            <CalcFunctionButton
              key={arrVal}
              value={arrVal}
              onClick={(e) => checkFunction(e.currentTarget.value)}
            >
              {arrVal}
            </CalcFunctionButton>
          );
        }
      })}
    </ButtonContainer>
  );
};

export default CalcButtons;
