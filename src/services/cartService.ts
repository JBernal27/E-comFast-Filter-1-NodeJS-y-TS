import CartRepository from "../repositories/cartRepository";
import { inject, injectable } from "tsyringe";

@injectable()
export default class CartService {
  constructor(@inject(CartRepository) private cartRepocitory: CartRepository) {}

  async create(userId: number) {
    return await this.cartRepocitory.create(userId);
  }

  async all() {
    return await this.cartRepocitory.findAll();
  }

  async findById(id: number) {
    const cart = await this.cartRepocitory.findById(id);
    if (cart) {
      return cart;
    } else throw new Error("No extiste un paciente con ese ID");
  }

  async findByUser(userId: number) {
    return await this.cartRepocitory.findByUser(userId);
  }

  async delete(id: number) {
    return await this.cartRepocitory.delete(id);
  }
}
