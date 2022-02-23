import create from "zustand";
import checkNumberInput from "./actions/checkNumberInput";
import checkDeleteLastInput from "./actions/checkDeleteLastInput";
import updateOperand from "./actions/updateOperand";
import { evaluate } from "mathjs";
import { LIST_OF_OPERATIONS } from "./constants";

interface State {
  currentEquation: string;
  selectedOperand: string;
  previousInput: string;

  setEquation: (currentEquation: string) => void;
  setOperand: (givenOperand: string) => void;
  setPreviousInput: (givenInput: string) => void;
  addOperand: (givenOperand: string) => void;
  evaluateEquation: () => void;
  clearCalculator: () => void;
  deleteLastInput: () => void;
}

const useStore = create<State>((set) => ({
  currentEquation: "0",
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
  addOperand: (givenOperand: string) => {
    set(() => ({
      currentEquation: updateOperand(givenOperand),
    }));
  },
  evaluateEquation: () => {
    set((state) => ({
      currentEquation: LIST_OF_OPERATIONS.includes(state.previousInput)
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
