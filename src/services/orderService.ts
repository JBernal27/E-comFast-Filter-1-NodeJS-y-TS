import { Order } from "../models/order";
import OrderRepository from "../repositories/orderRepository";
import { inject, injectable } from "tsyringe";

@injectable()
export default class OrderService {
  constructor(
    @inject(OrderRepository) private orderRepocitory: OrderRepository
  ) {}

  async create(order: Order) {
    
    return await this.orderRepocitory.create(order);
  }

  async all() {
    return await this.orderRepocitory.findAll();
  }

  async delete(id: number) {
    return await this.orderRepocitory.delete(id);
  }
}
