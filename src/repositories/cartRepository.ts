import { Cart } from "../models/cart";
import { injectable } from "tsyringe";

@injectable()
export default class CartRepocitory {
  async create(userId: number) {
    return await Cart.create({userId});
  }

  async findAll() {
    return await Cart.findAll();
  }

  async findById(id: number) {
    return await Cart.findByPk(id);
  }

  async findByUser(userId: number) {
    return await Cart.findOne({ where: { userId } });
  }
}
