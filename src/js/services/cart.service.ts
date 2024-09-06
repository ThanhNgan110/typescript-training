import { API } from "../constants/config";
import ApiService from "./api.service";

export default class CartService extends ApiService {
  constructor() {
    super(API.URL_API, API.END_POINT_CART);
  }

  getCart = async () => {
    return await this.get();
  };
}
