import { API } from "../constants/config";
import ApiService from "./api.service";
import { Product } from "../type/product";

export default class CartItemService {
  private apiService: ApiService;

  constructor() {
    this.apiService = new ApiService(API.URL_API, API.END_POINT_CARTITEM);
  }

  getAllProductsFromCart = async (): Promise<Product[]> => {
    return await this.apiService.get();
  };

  addProductToCart = async (product: Product) => {
    await this.apiService.post(product);
  };

  updateCart = async (data: { id: string; amount: number }) => {
    return await this.apiService.patch(data);
  };

  deleteProductFromCart = async (id: string) => {
    return await this.apiService.delete(id);
  };
}
