import { Product } from "../models/product";
import ProductRepository from "../repositories/productRepository";
import { inject, injectable } from "tsyringe";

@injectable()
export default class ProductService {
  constructor(
    @inject(ProductRepository) private productRepocitory: ProductRepository
  ) {}

  async create(product: Product) {
    return await this.productRepocitory.create(product);
  }

  async all() {
    return await this.productRepocitory.findAll();
  }

  async getById(id: number) {
    const product = await this.productRepocitory.findById(id);
    if (product) {
      return product;
    } else throw new Error("No extiste un producto con ese ID");
  }

  async chageStock(newProduct: Product) {
    const product: Product = await this.getById(newProduct.id);
    if (product) {
      return await this.productRepocitory.chageQuantity(
        newProduct.id,
        newProduct.stock
      );
    }
  }

  async delete(id: number) {
    return await this.productRepocitory.delete(id);
  }
}
