import State from "../../type/state";

export default class StateEntity implements State {
  id: string;
  countryId: number;
  name: string;

  constructor(data: State) {
    this.id = data.id;
    this.countryId = data.countryId;
    this.name = data.name;
  }
}
