import CartEntity from "./entity/cart.entity";
import { Product } from "../type/product";

export default class CartModel {
  private products: Product[] = [];

  setCart = (products: Product[]) => {
    this.products = products.map((item) => new CartEntity(item));
  };

  getCart = () => {
    return this.products;
  };

  getProductById = (id: string) => {
    return this.products.find((item) => item.id === id);
  };

  checkProductIdExisting = (id: string) => {
    return this.getProductById(id);
  };

  totalProductAndPrice(products: Product[]): {
    product: Product[];
    total: string;
  } {
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
