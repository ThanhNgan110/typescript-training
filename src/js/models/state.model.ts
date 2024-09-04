import StateEntity from "./entity/state.entity";
import State from "../type/state";

export default class StateModel {
  private state: StateEntity[] = [];

  setState(states: State[]): void {
    this.state = states.map((state) => new StateEntity(state));
  }

  getState = () => {
    return this.state;
  };

  getStateByCountry = (countryId: string) => {
    return this.state.filter(
      (state) => state.countryId.toString() == countryId
    );
  };
}
