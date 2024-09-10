import { API } from "../constants/config";
import ApiService from "./api.service";
import { Countries } from "../type/countries";

export default class CountryService extends ApiService<Countries> {
  constructor() {
    super(API.URL_API, API.END_POINT_COUNTRY);
  }

  getCountry = async (): Promise<Countries[]> => {
    const countries = await this.get();
    return Array.isArray(countries) ? countries : [];
  };
}
