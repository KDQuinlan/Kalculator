const checkDeleteLastInput = (inputString: any) => {
  if (inputString === "0") return inputString;
  if (inputString.length === 1) return "0";
  return inputString.substring(0, inputString.length - 1).trim();
};

export default checkDeleteLastInput;
