import ProductCardRepository from "../repositories/productCardRepository";
import { inject, injectable } from "tsyringe";
import { ProductCart } from "../models/productCart";

@injectable()
export default class ProductCartService {
  constructor(
    @inject(ProductCardRepository)
    private productCartRepocitory: ProductCardRepository
  ) {}

  async create(cartId: number, productId: number, quantity: number) {
    return await this.productCartRepocitory.create(cartId, productId, quantity);
  }

  async all() {
    return await this.productCartRepocitory.findAll();
  }

  async findByCart(cartId: number) {
    const cart = await this.productCartRepocitory.findByCart(cartId);
    if (cart) {
      return cart;
    } else
      throw new Error(
        "No extiste un carrito perteneciente aun usuario con ese ID"
      );
  }
}
