import create from "zustand";
import checkNumberInput from "./actions/checkNumberInput";
import checkDeleteLastInput from "./actions/checkDeleteLastInput";
import { evaluate } from "mathjs";

interface State {
  currentEquation: string;
  selectedOperand: string;
  previousInput: string;
  numberBeingTyped: string;
  setEquation: (currentEquation: string) => void;
  setOperand: (givenOperand: string) => void;
  setPreviousInput: (givenInput: string) => void;
  setNumberBeingTyped: (givenInput: string) => void;
  addOperand: (givenOperand: string) => void;
  evaluateEquation: () => void;
  clearCalculator: () => void;
  deleteLastInput: () => void;
}

const useStore = create<State>((set) => ({
  currentEquation: "0",
  numberBeingTyped: "0",
  selectedOperand: "",
  previousInput: "",

  setEquation: (givenNumber: string) => {
    set((state) => ({
      currentEquation: checkNumberInput(givenNumber, state.currentEquation),
    }));
  },
  setOperand: (givenOperand: string) => {
    set(() => ({
      selectedOperand: givenOperand,
    }));
  },
  setPreviousInput: (givenInput: string) => {
    set(() => ({
      previousInput: givenInput,
    }));
  },
  setNumberBeingTyped: (givenInput: string) => {
    set((state) => ({
      numberBeingTyped: checkNumberInput(givenInput, state.currentEquation),
    }));
  },
  addOperand: (givenOperand: string) => {
    set((state) => ({
      currentEquation: ["X", "/", "+", "-"].includes(state.previousInput)
        ? state.currentEquation
        : state.currentEquation.concat(" ", givenOperand),
    }));
  },
  evaluateEquation: () => {
    set((state) => ({
      currentEquation: ["X", "/", "+", "-"].includes(state.previousInput)
        ? state.currentEquation
        : parseFloat(evaluate(state.currentEquation.replace(/X/g, "*")).toPrecision(12)).toString(),
    }));
  },
  clearCalculator: () => {
    set(() => ({ currentEquation: "0", previousInput: "", selectedOperand: "" }));
  },
  deleteLastInput: () => {
    set((state) => ({
      currentEquation: checkDeleteLastInput(state.currentEquation),
    }));
  },
}));

export default useStore;
