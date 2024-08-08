import ProductCardRepository from "../repositories/productCardRepository";
import { inject, injectable } from "tsyringe";
import { ProductCart } from "../models/productCart";

@injectable()
export default class ProductCartService {
  constructor(
    @inject(ProductCardRepository)
    private productCartRepocitory: ProductCardRepository
  ) { }

  async create(cartId: number, productId: number, quantity: number) {
    return await this.productCartRepocitory.create(cartId, productId, quantity);
  }

  async all() {
    return await this.productCartRepocitory.findAll();
  }

  async isProductAdded(cartId: number, productId: number) {
    return await this.productCartRepocitory.isProductAdded(cartId, productId);
  }

  async chageQuantity(cartId: number, productId: number, newQuantity: number, oldQuantity: number) {
    const product = await this.findByCart(cartId);
    if (product) {
      return await this.productCartRepocitory.chageQuantity(cartId, productId, (oldQuantity + newQuantity));
    }
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
