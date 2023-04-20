import promptSync from "prompt-sync";
import fs from "fs";
import {
  errorTexts,
  inputs,
  sortOrderTypes,
  criteriaTypes,
} from "./constants.js";
const prompt = promptSync({ sigint: true });

function readInput(inputText, errorText, validate) {
  let value;
  while (true) {
    value = prompt(inputText + ": ");
    if (validate(value)) {
      break;
    } else {
      console.log(errorText);
    }
  }
  return value;
}

export const getInput = () => {
  const filePath = readInput(
    inputs.filePathInput,
    errorTexts.invalidInput,
    fs.existsSync
  );
  const order = readInput(inputs.orderInput, errorTexts.invalidInput, (order) =>
    Object.values(sortOrderTypes).includes(order)
  );
  const criteria = readInput(
    inputs.criteriaInput,
    errorTexts.invalidInput,
    (criteria) => Object.values(criteriaTypes).includes(criteria)
  );
  return { filePath, order, criteria };
};
