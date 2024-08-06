import { Order } from "../models/order";
import { injectable } from "tsyringe";

@injectable()
export default class OrderRepository {
  async create(order: Partial<Order>) {
    return await Order.create(order);
  }

  async findAll() {
    return await Order.findAll();
  }

  async delete(id: number) {
    return await Order.destroy({ where: { id } });
  }
}
