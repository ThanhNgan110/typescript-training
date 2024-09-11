import { API } from "../constants/config";
import ApiService from "./api.service";
import { Cart } from "../type/product";

export default class CartService extends ApiService<Cart> {
  constructor() {
    super(API.URL_API, API.END_POINT_CART);
  }

  getCart = async () => {
    return await this.get();
  };
}
