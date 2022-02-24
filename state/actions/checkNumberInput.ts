import useStore from "../store";
import { LIST_OF_OPERATIONS } from "../constants";

const checkNumberInput = (givenNumber: any, currentEquation: any) => {
  const previousInput = useStore.getState().previousInput;
  const selectedOperand = useStore.getState().selectedOperand;
  const lastCharacter = currentEquation.substring(currentEquation.length - 1).trim();
  const allButLastCharacter = currentEquation.substring(0, currentEquation.length - 1).trim();
  const secondToLastCharacter = allButLastCharacter
    .substring(allButLastCharacter.length - 1)
    .trim();

  const checkForDecimals =
    selectedOperand === ""
      ? currentEquation
      : currentEquation.substring(currentEquation.lastIndexOf(selectedOperand) + 1);

  if (currentEquation.length === 1 && currentEquation === "-") {
    return currentEquation.concat(givenNumber);
  }

  if (lastCharacter === "-" && LIST_OF_OPERATIONS.includes(secondToLastCharacter)) {
    return currentEquation.concat(givenNumber);
  }

  if (givenNumber === "." && checkForDecimals.includes(".")) return currentEquation;

  if (
    isNaN(Number(previousInput)) === false &&
    LIST_OF_OPERATIONS.includes(lastCharacter) &&
    givenNumber === "."
  ) {
    return currentEquation.concat(" 0", givenNumber);
  }
  if (currentEquation === "0" && givenNumber !== ".") return givenNumber;

  if (!LIST_OF_OPERATIONS.includes(previousInput)) return currentEquation.concat(givenNumber);

  if (lastCharacter === ".") return currentEquation.concat(givenNumber);

  if (LIST_OF_OPERATIONS.includes(lastCharacter) && givenNumber === ".") {
    return currentEquation.concat(" 0", givenNumber);
  }

  return currentEquation.concat(" ", givenNumber);
};

export default checkNumberInput;
