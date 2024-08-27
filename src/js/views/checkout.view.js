import { querySelector, getElementById } from "../helpers/selector";
import { orderSummary } from "../templates/checkout.template";

export default class CheckoutView {
  constructor() {
    this.wrapperCheckout = querySelector(".wrapper-checkout");
  }

  renderFormCheckout = (products) => {
    this.wrapperCheckout.innerHTML = orderSummary(products);
  };

  setDefaultCountry = (handler, countries) => {
    const countrySelect = getElementById("country");
    if (!countrySelect.value) {
      countrySelect.value = countries[0].id;
    }

    handler(countrySelect.value);
  };

  bindEventChangeCountry = (handler) => {
    const countrySelect = getElementById("country");
    countrySelect.addEventListener("change", () => {
      const selectedCountryId = countrySelect.value;
      handler(selectedCountryId);
    });
  };

  handleDataDropdown = (data, selectId) => {
    const selectElement = getElementById(selectId);
    selectElement.innerHTML = "";
    data.forEach((item) => {
      const option = document.createElement("option");
      option.value = item.id;
      option.text = item.name;
      selectElement.appendChild(option);
    });
  };

  handleRenderCountry = (countries) => {
    this.handleDataDropdown(countries, "country");
  };

  handleRenderStates = (states) => {
    this.handleDataDropdown(states, "states");
  };

  handleDisplayMessageError = (inputElement, message) => {
    if (inputElement) {
      const errorElement = inputElement.nextElementSibling;
      if (errorElement && errorElement.classList.contains("mess-error")) {
        errorElement.textContent = message;
      }
    }
  };

  checkFormValid = (formErrorMess) => {
    for (const message of Object.values(formErrorMess)) {
      if (message !== "") {
        return false;
      }
    }
    return true;
  };

  updateFormUi = (formErrorMess) => {
    const form = getElementById("form-checkout");
    const btnOrder = getElementById("btn-order");

    for (const [fieldName, message] of Object.entries(formErrorMess)) {
      if (fieldName !== "note") {
        const inputElement = form.querySelector(`[name="${fieldName}"]`);
        this.handleDisplayMessageError(inputElement, message);
      }
    }

    let allFieldsFilled = true;

    for (let input of form.elements) {
      if (
        input.type !== "submit" &&
        input.type !== "button" &&
        input.name !== "note" &&
        input.tagName.toLowerCase() !== "textarea" &&
        input.tagName.toLowerCase() !== "select" &&
        input.value.trim() === ""
      ) {
        allFieldsFilled = false;
        break;
      }
    }

    const isFormValid = this.checkFormValid(formErrorMess);

    btnOrder.disabled = !allFieldsFilled || !isFormValid;
  };

  bindChangeCheckoutForm = (handler) => {
    const form = getElementById("form-checkout");
    for (let input of form.elements) {
      input.addEventListener("input", () => {
        if (input.tagName.toLowerCase() !== "select") {
          handler({ [input.name]: input.value }, input.name);
        }
      });
    }
  };
}
