import { REGEX_PATTERNS } from "../constants/regexPatterns";
import { LABELS } from "../constants/label";

const validateEmpty = ({ key, value }) => {
  return value.trim() === "" ? `${LABELS[key]} is required` : "";
};

const validateInteger = ({ key, value }) => {
  return !REGEX_PATTERNS.VALID_INTEGER.test(value)
    ? `${LABELS[key]} must be a integer`
    : "";
};

const validateString = ({ key, value }) => {
  return typeof value !== "string" || isNaN(value) === false
    ? `${LABELS[key]} must be a string`
    : "";
};

const validateEmail = ({ key, value }) => {
  return !REGEX_PATTERNS.VALID_EMAIL.test(value)
    ? `${LABELS[key]} format is invalid`
    : "";
};

const validatePhone = ({ key, value }) => {
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
