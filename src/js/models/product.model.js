import ProductEntity from "./entity/product.entity";
export default class ProductModel {
  setProducts = (products) => {
    this.products = products.map((product) => new ProductEntity(product));
  };

  getProducts = () => {
    return this.products;
  };

  getProductById(id) {
    return this.products.find(product => product.id === id);
  };

  searchProductByName = (productName) => {
    const result = this.products.filter((product) =>
    product.name.toLowerCase().includes(productName.toLowerCase()));
    return result.length > 0 ? result : null;
  };
}
