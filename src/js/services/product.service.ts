import { API } from "../constants/config";
import ApiService from "./api.service";

export default class ProductService extends ApiService {
  constructor() {
    super(API.URL_API, API.END_POINT_PRODUCT);
  }

  getAllProducts = async () => {
    return await this.get();
  };
}
