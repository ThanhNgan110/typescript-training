import CartEntity from "./entity/cart.entity";
import { Cart } from "../type/product";
import BaseModel from "./base.model";

export default class CartModel extends BaseModel<Cart> {
  setCart = (products: Cart[]) => {
    this.setEntities(products, CartEntity);
  };

  getCart = (): Cart[] => {
    return this.getEntities();
  };

  getProductById = (id: string) => {
    return this.findById(id, "id");
  };

  checkProductIdExisting = (id: string) => {
    return this.getProductById(id);
  };

  totalProductAndPrice(products: Cart[]) {
    let total = 0;
    if (products) {
      products.forEach((item) => {
        total += parseFloat((item.amount * item.price).toFixed(2));
      });
    }

    return {
      product: products,
      total: total.toFixed(2),
    };
  }
}
