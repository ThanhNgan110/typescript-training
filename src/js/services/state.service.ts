import { API } from "../constants/config";
import ApiService from "./api.service";

export default class StateService {
  private apiService: ApiService;

  constructor() {
    this.apiService = new ApiService(API.URL_API, API.END_POINT_STATES);
  }

  getState = async () => {
    return await this.apiService.get();
  };
}
