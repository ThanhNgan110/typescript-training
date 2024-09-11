import BaseModel from "./base.model";
import StateEntity from "./entity/state.entity";
import State from "../type/state";

export default class StateModel extends BaseModel<StateEntity> {
  constructor() {
    super();
  }

  setState = (states: State[]): void => {
    this.setEntities(states, StateEntity);
  };

  getState = (): StateEntity[] => {
    return this.getEntities();
  };

  getStateByCountry = (countryId: string): StateEntity[] => {
    return this.entities.filter(
      (state) => state.countryId.toString() === countryId
    );
  };
}
