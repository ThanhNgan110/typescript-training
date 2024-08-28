import { API } from "../constants/config";
import ApiService from "./api.service";

export default class CountryService {
  private apiService: ApiService;

  constructor() {
    this.apiService = new ApiService(API.URL_API, API.END_POINT_COUNTRY);
  }

  getCountry = async () => {
    return await this.apiService.get();
  };
}
