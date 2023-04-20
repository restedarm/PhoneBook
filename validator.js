import { isNumber } from "./utils.js";
import { errorTexts, separators } from "./constants.js";

export class Validator {
  validateNumber(str) {
    const checkable = str.split("");
    if (checkable.length !== 9) return errorTexts.digitsError;
    return checkable.every(isNumber) ? null : errorTexts.phoneError;
  }

  validateSeparator(separator) {
    if (!separators.includes(separator)) {
      return errorTexts.separatorError;
    }
  }

  validate(contact) {
    const errors = [
      this.validateNumber(contact.number),
      this.validateSeparator(contact.separator),
    ];
    return errors.filter(Boolean);
  }
}
