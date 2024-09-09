export default class BaseModel<T> {
  protected entities: T[] = [];

  setEntities = (entities: T[] | T, EntityConstructor: new (item: T) => T) => {
    // Check if entities is an array or a single object
    if (Array.isArray(entities)) {
      this.entities = entities.map((item) => new EntityConstructor(item));
    } else {
      this.entities = [new EntityConstructor(entities)];
    }
  };

  getEntities = (): T[] => {
    return this.entities;
  };

  findById = (id: string, key: keyof T) => {
    return this.entities.find((item) => item[key] === id);
  };
}
