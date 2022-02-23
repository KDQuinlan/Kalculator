import useStore from "../store";

const checkNumberInput = (givenNumber: any, currentEquation: any) => {
  const previousInput = useStore.getState().previousInput;
  const selectedOperand = useStore.getState().selectedOperand;
  const listOfOperations = ["X", "/", "+", "-"];

  const checkForDecimals =
    selectedOperand === ""
      ? currentEquation
      : currentEquation.substring(currentEquation.lastIndexOf(selectedOperand) + 1);

  console.log(checkForDecimals);

  if (givenNumber === "." && checkForDecimals.includes(".")) return currentEquation;
  if (currentEquation === "0" && givenNumber !== ".") return givenNumber;
  if (!listOfOperations.includes(previousInput)) return currentEquation.concat(givenNumber);
  return currentEquation.concat(" ", givenNumber);
};

export default checkNumberInput;
