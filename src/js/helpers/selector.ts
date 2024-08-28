// Get element(s) by CSS selector:
const querySelector = (selector: string) => document.querySelector(selector);

const querySelectorAll = (selector: string) =>
  document.querySelectorAll(selector);

const getElementById = (selector: string) => document.getElementById(selector);

export { querySelector, querySelectorAll, getElementById };
