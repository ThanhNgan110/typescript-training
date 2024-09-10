import OrderEntity from "./entity/order.entity";
import Order from "../type/order";
import BaseModel from "./base.model";

export default class OrderModel extends BaseModel<Order> {
  private orderEntity: OrderEntity;

  constructor(orderData?: Order) {
    super();
    this.orderEntity = orderData
      ? new OrderEntity(orderData)
      : new OrderEntity({} as Order);
  }

  setOrder = (orderData: Partial<Order>) => {
    // Ensure all required fields of Order are filled with defaults
    
    const fullOrderData: Order = {
      firstName: orderData.firstName || "",
      lastName: orderData.lastName || "",
      address: orderData.address || "",
      companyName: orderData.companyName || "",
      zipCode: orderData.zipCode || "",
      email: orderData.email || "",
      phoneNumber: orderData.phoneNumber || "",
      note: orderData.note || "",
    };

    this.orderEntity = new OrderEntity(fullOrderData);
    return this.setEntities(fullOrderData, OrderEntity);
  };

  validate = (inputValue: Partial<Order>) => {
    return this.orderEntity.validate(inputValue);
  };

  getOrder = () => {
    return this.getEntities();
  };
}
