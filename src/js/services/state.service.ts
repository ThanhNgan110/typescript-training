import { API } from "../constants/config";
import ApiService from "./api.service";
import State from "../type/state";

export default class StateService extends ApiService<State> {
  constructor() {
    super(API.URL_API, API.END_POINT_STATES);
  }

  getState = async () => {
    const states = await this.get();
    return Array.isArray(states) ? states : [];
  };
}
