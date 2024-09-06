import { API } from "../constants/config";
import ApiService from "./api.service";

export default class CountryService extends ApiService {
  constructor() {
    super(API.URL_API, API.END_POINT_COUNTRY);
  }

  getCountry = async () => {
    return await this.get();
  };
}
