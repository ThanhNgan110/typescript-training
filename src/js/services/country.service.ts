import { API } from "../constants/config";
import ApiService from "./api.service";
import { Country } from "../type/country";

export default class CountryService extends ApiService<Country> {
  constructor() {
    super(API.URL_API, API.END_POINT_COUNTRY);
  }

  getCountry = async (): Promise<Country[]> => {
    const countries = await this.get();
    return Array.isArray(countries) ? countries : [];
  };
}
