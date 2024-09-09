import OrderEntity from "./entity/order.entity";
import Order from "../type/order";
import BaseModel from "./base.model";

export default class OrderModel extends BaseModel<Order> {
  private orderEntity: Order;

  constructor(orderData: Order) {
    super();
    this.orderEntity = orderData;
  }

  setOrder = (orderData: Order) => {
    this.orderEntity = new OrderEntity(orderData);
    return this.setEntities(orderData, OrderEntity);
  };

  validate = (inputValue: Partial<Order>) => {
    return this.orderEntity.validate(inputValue);
  };

  getOrder = () => {
    return this.getEntities();
  };
}
