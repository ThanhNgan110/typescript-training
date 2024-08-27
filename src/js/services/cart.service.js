import { API } from "../constants/config";
import ApiService from "./api.service";
export default class CartService {
  constructor() {
    this.apiService = new ApiService(API.URL_API, API.END_POINT_CART);
  }

  getCart = async () => {
    return await this.apiService.get();
  }
}
