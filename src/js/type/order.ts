interface Order {
  firstName: string;
  lastName: string;
  companyName: string;
  address: string;
  zipCode: string;
  email: string;
  phoneNumber: string;
  note: string;
  validate(inputValue: Order): void;
}

export default Order;
