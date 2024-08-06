import { ProductCart } from "../models/productCart";
import { injectable } from "tsyringe";

@injectable()
export default class ProductCartRepository {
  async create(cartId: number, productId: number, quantity: number) {
    return await ProductCart.create({ productId, cartId, quantity });
  }

  async findAll() {
    return await ProductCart.findAll();
  }

  async findByCart(cartId: number) {
    return await ProductCart.findOne({ where: { cartId } });
  }
}
