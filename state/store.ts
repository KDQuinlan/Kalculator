import create from "zustand";
import checkNumberInput from "./actions/checkNumberInput";
import checkDeleteLastInput from "./actions/checkDeleteLastInput";
import updateOperand from "./actions/updateOperand";
import { evaluate } from "mathjs";
import { LIST_OF_OPERATIONS } from "./constants";

interface State {
  currentEquation: string;
  previousEquation: string;
  selectedOperand: string;
  previousInput: string;
  previousCalculations: any;

  setEquation: (givenNumber: string) => void;
  setEquationFromPreviousResult: (givenNumber: string) => void;
  setPreviousEquation: (equation: string) => void;
  setOperand: (givenOperand: string) => void;
  setPreviousInput: (givenInput: string) => void;
  setPreviousCalculations: (equationAndAnswer: string[]) => void;
  addOperand: (givenOperand: string) => void;
  evaluateEquation: () => void;
  clearCalculator: () => void;
  deleteLastInput: () => void;
}

const useStore = create<State>((set) => ({
  currentEquation: "0",
  previousEquation: "",
  selectedOperand: "",
  previousInput: "",
  previousCalculations: [],

  setEquation: (givenNumber: string) => {
    set((state) => ({
      currentEquation: checkNumberInput(givenNumber, state.currentEquation),
    }));
  },
  setEquationFromPreviousResult: (givenNumber: string) => {
    set(() => ({
      currentEquation: givenNumber,
    }));
  },
  setPreviousEquation: (equation: string) => {
    set(() => ({
      previousEquation: equation,
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
  setPreviousCalculations: (equationAndAnswer: string[]) => {
    set(() => ({
      previousCalculations: equationAndAnswer,
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
