import OrderEntity from "./entity/order.entity";
import Order from "../type/order";

export default class OrderModel {
  private orderEntity: Order;

  constructor(orderData: Order) {
    this.orderEntity = orderData;
  }

  setOrder = (orderData: Order) => {
    this.orderEntity = new OrderEntity(orderData);
  };

  validate = (inputValue: Partial<Order>) => {
    return this.orderEntity.validate(inputValue);
  };

  getOrder = () => {
    return this.orderEntity;
  };
}
