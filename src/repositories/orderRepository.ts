import { Order } from "../models/order";
import { injectable } from "tsyringe";

@injectable()
export default class OrderRepository {
  async create(order: Partial<Order>) {
    return await Order.create(order);
  }

  async update(order: Partial<Order>) {
    return await Order.update(order, {where: {userId:order.userId}});
  }

  async findAll() {
    return await Order.findAll();
  }

  async getByUserId(userId:number) {
    return await Order.findAll({where:{userId}});
  }

  async delete(id: number) {
    return await Order.destroy({ where: { id } });
  }
}
