import { API } from "../constants/config";
import ApiService from "./api.service";
import { Product } from "../type/product";

export default class ProductService extends ApiService<Product> {
  constructor() {
    super(API.URL_API, API.END_POINT_PRODUCT);
  }

  getAllProducts = async () => {
    return await this.get();
  };
}
