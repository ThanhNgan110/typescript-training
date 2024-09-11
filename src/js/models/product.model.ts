import BaseModel from "./base.model";
import ProductEntity from "./entity/product.entity";
import { Product } from "../type/product";

export default class ProductModel extends BaseModel<Product> {
  constructor() {
    super();
  }

  setProducts = (products: Product[]): void => {
    this.setEntities(products, ProductEntity);
  };

  getProducts = (): Product[] => {
    return this.getEntities();
  };

  getProductById = (id: string)=> {
    return this.findById(id, "id");
  };

  searchProductByName = (productName: string): Product[] | null => {
    const result = this.entities.filter((product) =>
      product.name.toLowerCase().includes(productName.toLowerCase())
    );
    return result.length > 0 ? result : null;
  };
}
