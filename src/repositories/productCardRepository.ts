import { Product } from "../models/product";
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

  async isProductAdded(cartId: number, productId: number) {
    return await ProductCart.findOne({ where: { cartId, productId } })
  }

  async findByCart(cartId: number) {
    return await ProductCart.findAll({ where: { cartId },
      include:[
        {
          model: Product,
          required: true
        }
      ]
    });
  }

  async chageQuantity(cartId: number, productId: number, quantity: number) {
    return await ProductCart.update({ quantity }, { where: { cartId, productId } });
  }
}
