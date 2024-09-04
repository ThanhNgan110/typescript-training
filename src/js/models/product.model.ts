import ProductEntity from "./entity/product.entity";
import { Product } from "../type/product";

export default class ProductModel {
  private products: Product[] = [];

  setProducts = (products: Product[]) => {
    this.products = products.map((product) => new ProductEntity(product));
  };

  getProducts = () => {
    return this.products;
  };

  getProductById(id: string) {
    return this.products.find((product) => product.id === id);
  }

  searchProductByName = (productName: string) => {
    const result = this.products.filter((product) =>
      product.name.toLowerCase().includes(productName.toLowerCase())
    );
    return result.length > 0 ? result : null;
  };
}
