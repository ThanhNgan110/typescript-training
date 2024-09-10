import { REGEX_PATTERNS } from "../constants/regexPatterns";
import { LABELS } from "../constants/label";
import { ValidateString, ValidateInteger } from "../type/validate";

const validateEmpty = ({ key, value } : ValidateString ) => {
  return value.trim() === "" ? `${LABELS[key]} is required` : "";
};

const validateInteger = ({ key, value }: ValidateInteger) => {
  return !REGEX_PATTERNS.VALID_INTEGER.test(String(value))
    ? `${LABELS[key]} must be a integer`
    : "";
};

const validateString = ({ key, value }: ValidateString) => {
  return typeof value !== "string" || isNaN(Number(value)) === false
    ? `${LABELS[key]} must be a string`
    : "";
};

const validateEmail = ({ key, value }: ValidateString) => {
  return !REGEX_PATTERNS.VALID_EMAIL.test(value)
    ? `${LABELS[key]} format is invalid`
    : "";
};

const validatePhone = ({ key, value }: ValidateString) => {
  return !REGEX_PATTERNS.VALID_NUMBER_PHONE.test(value)
    ? `${LABELS[key]} format is invalid`
    : "";
};

export {
  validateString,
  validateInteger,
  validateEmpty,
  validateEmail,
  validatePhone,
};
