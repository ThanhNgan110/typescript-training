import { querySelector, getElementById } from "../helpers/selector";

import { orderSummary } from "../templates/checkout.template";

import Order from "../type/order";
import { Product } from "../type/product";
import State from "../type/state";
import { Country } from "../type/country";

export default class CheckoutView {
  wrapperCheckout: Element | null;

  constructor() {
    this.wrapperCheckout = querySelector(".wrapper-checkout");
  }

  renderFormCheckout = (products: Product[]) => {
    if (!this.wrapperCheckout) {
      return { error: "Not found element" };
    }
    this.wrapperCheckout.innerHTML = orderSummary(products);
  };

  setDefaultCountry = (
    handler: (selectCountry: string) => void,
    countries: Country[]
  ) => {
    const countrySelect: HTMLElement | null =
      document.getElementById("country");

    if (!countrySelect) {
      throw new Error("Element not found");
    }

    const selectElement = countrySelect as HTMLSelectElement;
    if (!selectElement.value) {
      selectElement.value = countries[0].toString();
    }

    handler(selectElement.value);
  };

  bindEventChangeCountry = (
    handler: (selectedCountryId: string) => void
  ): { error?: string } | void => {
    const countrySelect: HTMLElement | null = getElementById("country");

    if (!countrySelect) {
      return { error: "Element not found" };
    }

    const selectElement = countrySelect as HTMLSelectElement;
    countrySelect.addEventListener("change", () => {
      const selectedCountryId = selectElement.value;
      handler(selectedCountryId);
    });

    return;
  };

  handleDataDropdown = (
    data: { id: string; name: string }[],
    selectId: string
  ): { error?: string } | void => {
    const selectElement: HTMLElement | null = getElementById(selectId);

    if (!selectElement) {
      return { error: "Element not found" };
    }

    selectElement.innerHTML = "";
    data?.forEach((item) => {
      const option = document.createElement("option");
      option.value = item.id;
      option.text = item.name;
      selectElement.appendChild(option);
    });

    return;
  };

  handleRenderCountry = (countries: Country[]) => {
    this.handleDataDropdown(countries, "country");
  };

  handleRenderStates = (states: State[]) => {
    this.handleDataDropdown(states, "states");
  };

  handleDisplayMessageError = (
    inputElement: HTMLInputElement | null,
    message: string
  ) => {
    if (inputElement instanceof HTMLInputElement) {
      const errorElement = inputElement.nextElementSibling;
      if (errorElement && errorElement.classList.contains("mess-error")) {
        errorElement.textContent = message;
      }
    }
  };

  checkFormValid = (formErrorMess: { [key: string]: string }) => {
    for (const message of Object.values(formErrorMess)) {
      if (message !== "") {
        return false;
      }
    }

    return true;
  };

  updateFormUi = (formErrorMess: { [key: string]: string }) => {
    const form: HTMLElement | null = getElementById("form-checkout");
    const btnOrder: HTMLElement | null = getElementById("btn-order");

    for (const [fieldName, message] of Object.entries(formErrorMess)) {
      if (fieldName !== "note") {
        const inputElement = form?.querySelector(
          `[name="${fieldName}"]`
        ) as HTMLInputElement;
        this.handleDisplayMessageError(inputElement, message);
      }
    }

    let allFieldsFilled = true;

    if (!form) {
      return { error: "Element form not found" };
    }

    for (let input of (form as HTMLFormElement).elements) {
      if (
        (input as HTMLInputElement).type !== "submit" &&
        (input as HTMLInputElement).type !== "button" &&
        (input as HTMLInputElement).name !== "note" &&
        input.tagName.toLowerCase() !== "textarea" &&
        input.tagName.toLowerCase() !== "select" &&
        (input as HTMLInputElement).value.trim() === ""
      ) {
        allFieldsFilled = false;
        break;
      }
    }

    const isFormValid = this.checkFormValid(formErrorMess);

    if (!btnOrder) {
      return { error: "Element btnOrder not found" };
    }

    (btnOrder as HTMLInputElement).disabled = !allFieldsFilled || !isFormValid;
  };

  bindChangeCheckoutForm = (
    handler: (data: Partial<Order>, fieldName: string) => void
  ): { error?: string } | void => {
    const form: HTMLElement | null = getElementById("form-checkout");

    if (!form) {
      return { error: "Element not found" };
    }

    for (let input of (form as HTMLFormElement).elements) {
      input.addEventListener("input", () => {
        if (input.tagName.toLowerCase() !== "select") {
          const inputElement = input as HTMLInputElement;
          handler(
            { [inputElement.name]: inputElement.value },
            inputElement.name
          );
        }
      });
    }
  };
}
