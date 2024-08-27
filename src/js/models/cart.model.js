import CartEntity from "./entity/cart.entity";
export default class CartModel {
  setCart = (products) => {
    this.products = products.map((item) => new CartEntity(item));
  };

  getCart = () => {
    return this.products;
  };

  getProductById = (id) => {
    return this.products.find((item) => item.id === id);
  };

  checkProductIdExisting = (id) => {
     return this.getProductById(id);
  };

  totalProductAndPrice = (products) => {
    let total = 0;
    if (products) {
      products.forEach((item) => {
        total += parseFloat(item.amount * item.price);
      });
    }

    return {
      product: products,
      total: total.toFixed(2),
    };
  };
}
