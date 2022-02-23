import React from "react";
import useStore from "../state/store";

const CalcButtons = (arr: any) => {
  const listOfNumbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0, "."];
  const listOfOperations = ["X", "/", "+", "-"];

  const setEquation = useStore((state) => state.setEquation);
  const setOperand = useStore((state) => state.setOperand);
  const addOperand = useStore((state) => state.addOperand);
  const evaluateEquation = useStore((state) => state.evaluateEquation);
  const clearCalculator = useStore((state) => state.clearCalculator);
  const deleteLastInput = useStore((state) => state.deleteLastInput);
  const setPreviousInput = useStore((state) => state.setPreviousInput);

  const checkFunction = (buttonValue: string) => {
    if (buttonValue === "=") {
      evaluateEquation();
    } else if (buttonValue === "DEL") {
      deleteLastInput();

      const currentEquation = useStore.getState().currentEquation;
      setPreviousInput(currentEquation.substring(currentEquation.length - 1));
    } else if (buttonValue === "AC") {
      clearCalculator();
    }
  };

  return (
    <div className="grid w-[20rem] grid-cols-4 gap-0.5 bg-black md:w-[24rem]">
      {arr.arr.map((arrVal: any) => {
        if (listOfNumbers.includes(arrVal)) {
          return (
            <button
              className="h-20 bg-darktheme-800 text-2xl text-white first:col-span-2 last:col-span-2 md:h-24"
              key={arrVal}
              value={arrVal}
              onClick={(e) => {
                setEquation(e.currentTarget.value);
                setPreviousInput(e.currentTarget.value);
              }}
            >
              {arrVal}
            </button>
          );
        } else if (listOfOperations.includes(arrVal)) {
          return (
            <button
              className="h-20 bg-violet-400 text-2xl font-semibold first:col-span-2 last:col-span-2 md:h-24"
              key={arrVal}
              value={arrVal}
              onClick={(e) => {
                setOperand(e.currentTarget.value);
                addOperand(e.currentTarget.value);
                setPreviousInput(e.currentTarget.value);
              }}
            >
              {arrVal}
            </button>
          );
        } else {
          return (
            <button
              className="h-20 bg-violet-300 text-2xl font-semibold first:col-span-2 last:col-span-2 md:h-24"
              key={arrVal}
              value={arrVal}
              onClick={(e) => checkFunction(e.currentTarget.value)}
            >
              {arrVal}
            </button>
          );
        }
      })}
    </div>
  );
};

export default CalcButtons;
