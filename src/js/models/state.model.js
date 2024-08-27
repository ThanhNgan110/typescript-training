import StateEntity from "./entity/state.entity";
export default class StateModel {
  setState = (states) => {
    this.state = states.map((state) => new StateEntity(state));
  };

  getState = () => {
    return this.state;
  };

  getStateByCountry = (countryId) => {
    return this.state.filter((state) => state.countryId == countryId);
  };
}
