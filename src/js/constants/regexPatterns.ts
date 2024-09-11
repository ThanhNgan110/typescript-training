const REGEX_PATTERNS = {
  VALID_INTEGER: /^-?\d+$/,
  VALID_EMAIL: /^[\w.-]+@[a-zA-Z\d.-]+\.[a-zA-Z]{2,}$/i,
  VALID_NUMBER_PHONE: /^(\+\d{1,2}\s)?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/,
};

export { REGEX_PATTERNS };
