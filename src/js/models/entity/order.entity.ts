import {
  validateEmpty,
  validateEmail,
  validateInteger,
  validatePhone,
  validateString,
} from "../../helpers/validator";

import Order from "../../type/order";

export default class OrderEntity implements Order {
  firstName: string;
  lastName: string;
  companyName: string;
  address: string;
  zipCode: string;
  email: string;
  phoneNumber: string;
  note?: string;

  constructor(data: Order) {
    this.firstName = data.firstName;
    this.lastName = data.lastName;
    this.companyName = data.companyName;
    this.address = data.address;
    this.zipCode = data.zipCode;
    this.email = data.email;
    this.phoneNumber = data.phoneNumber;
    this.note = data.note;
  }

  validate = (orderEntity: Partial<Order>) => {
    let formError = {};

    const key = Object.keys(orderEntity)[0] as keyof Order;
    const value = orderEntity[key];

    if (value === null && key !== "note") {
      formError = validateEmpty({ key, value: "" });
    } else {
      switch (key) {
        case "firstName":
        case "lastName":
        case "address":
        case "companyName":
          formError = validateString({ key, value: value as string });
          break;

        case "zipCode":
          formError = validateInteger({ key, value: Number(value) });
          break;

        case "email":
          formError = validateEmail({ key, value: value as string });
          break;

        case "phoneNumber":
          formError = validatePhone({ key, value: value as string });
          break;

        case "note":
          formError = { key, value: value as string };
          break;

        default:
          break;
      }
    }

    return formError;
  };
}
