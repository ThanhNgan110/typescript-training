import { Cart } from "../../type/product";

export default class CartEntity implements Cart {
  id: string;
  cartId: string;
  name: string;
  price: number;
  amount: number;
  imgURL: string;

  constructor(data: Cart) {
    this.id = data.id;
    this.cartId = data.cartId;
    this.name = data.name;
    this.price = data.price;
    this.amount = data.amount;
    this.imgURL = data.imgURL;
  }
}
