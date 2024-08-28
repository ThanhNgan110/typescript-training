import { API } from "../constants/config";
import ApiService from "./api.service";

export default class ProductService {
  private apiService: ApiService;

  constructor() {
    this.apiService = new ApiService(API.URL_API, API.END_POINT_PRODUCT);
  }

  getAllProducts = async () => {
    return await this.apiService.get();
  };
}
