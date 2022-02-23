import useStore from "../store";
import { LIST_OF_OPERATIONS } from "../constants";

const updateOperand = (givenOperand: string) => {
  const currentEquation = useStore.getState().currentEquation;
  const previousInput = useStore.getState().previousInput;
  const lastCharacter = currentEquation.substring(currentEquation.length - 1).trim();
  const allButLastCharacter = currentEquation.substring(0, currentEquation.length - 1).trim();
  const secondToLastCharacter = allButLastCharacter
    .substring(allButLastCharacter.length - 1)
    .trim();

  if (lastCharacter === ".") return currentEquation;

  if (LIST_OF_OPERATIONS.includes(secondToLastCharacter) && lastCharacter === "-")
    return currentEquation;

  if (lastCharacter === "+" && givenOperand === "-") {
    return allButLastCharacter.concat(" ", givenOperand);
  }

  if (currentEquation === "0" && givenOperand === "-") return givenOperand;

  if (
    LIST_OF_OPERATIONS.includes(previousInput) &&
    givenOperand !== previousInput &&
    givenOperand === "-"
  ) {
    return currentEquation.concat(" ", givenOperand);
  }

  if (
    LIST_OF_OPERATIONS.includes(previousInput) &&
    givenOperand !== previousInput &&
    currentEquation.length !== 1
  ) {
    return allButLastCharacter.concat(" ", givenOperand);
  }

  if (LIST_OF_OPERATIONS.includes(previousInput) && givenOperand === previousInput) {
    return currentEquation;
  }

  return currentEquation.concat(" ", givenOperand);
};

export default updateOperand;
