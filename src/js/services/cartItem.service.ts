import { API } from "../constants/config";
import ApiService from "./api.service";

export default class CartItemService {
  private apiService: ApiService;

  constructor() {
    this.apiService = new ApiService(API.URL_API, API.END_POINT_CARTITEM);
  }

  getAllProductsFromCart = async () => {
    return await this.apiService.get();
  };

  addProductToCart = async (product: object) => {
    await this.apiService.post(product);
  };

  updateCart = async (data: { id: string }) => {
    return await this.apiService.patch(data);
  };

  deleteProductFromCart = async (id: string) => {
    return await this.apiService.delete(id);
  };
}
