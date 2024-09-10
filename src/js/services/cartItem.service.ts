import { API } from "../constants/config";
import ApiService from "./api.service";
import { Product, Cart } from "../type/product";

export default class CartItemService extends ApiService<Cart> {
  constructor() {
    super(API.URL_API, API.END_POINT_CARTITEM);
  }

  getAllProductsFromCart = async (): Promise<Cart[]> => {
    const result = await this.get();
    return Array.isArray(result) ? result : [];
  };

  addProductToCart = async (product: Product) => {
    return await this.post(product);
  };

  updateCart = async (data: { id: string; amount: number }) => {
    return await this.patch(data);
  };

  deleteProductFromCart = async (id: string) => {
    return await this.delete(id);
  };
}
