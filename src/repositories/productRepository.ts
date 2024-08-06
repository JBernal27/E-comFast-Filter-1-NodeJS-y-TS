import { Product } from "../models/product";
import { injectable } from "tsyringe";

@injectable()
export default class ProductRepository {
  async create(product: Partial<Product>) {
    return await Product.create(product);
  }
  async findAll() {
    return await Product.findAll();
  }

  async findById(id: number) {
    return await Product.findByPk(id);
  }

  async chageQuantity(id: number, stock: number) {
    return await Product.update({ stock }, { where: { id } });
  }

  async delete(id: number) {
    return await Product.destroy({ where: { id } });
  }

  // async filterByOrderId(){
  //     return await Product.findAll({ where: {orderId}
  //         order: [
  //             ['id', 'DESC'],
  //         ]
  //     })
  // }
}
