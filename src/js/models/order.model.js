import OrderEntity from "./entity/order.entity";

export default class OrderModel {
  setOrder = (orderData) => {
    this.orderEntity = new OrderEntity(orderData);
  }

  validate = (inputValue) => {
      return this.orderEntity.validate(inputValue);
  };
}
