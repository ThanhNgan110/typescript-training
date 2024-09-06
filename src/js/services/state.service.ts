import { API } from "../constants/config";
import ApiService from "./api.service";

export default class StateService extends ApiService {
  constructor() {
    super(API.URL_API, API.END_POINT_STATES);
  }

  getState = async () => {
    return await this.get();
  };
}
