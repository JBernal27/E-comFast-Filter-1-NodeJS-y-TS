import { Order } from "../models/order";
import { ProductCart } from "../models/productCart";
import OrderRepository from "../repositories/orderRepository";
import { inject, injectable } from "tsyringe";

@injectable()
export default class OrderService {
  constructor(
    @inject(OrderRepository) private orderRepocitory: OrderRepository
  ) {}

  async create(userId:number,productCart:ProductCart[], cartId:number) {    
    const total:number = productCart.reduce((acc, product):number => product.products.price * product.quantity,0)
    return await this.orderRepocitory.create({userId, cartId:cartId,total});
  }

  async update(userId:number,productCart:ProductCart[], cartId:number) {    
    const total:number = productCart.reduce((acc, product):number => acc + product.products.price * product.quantity,0)
    console.log(productCart)
    if (!await this.orderRepocitory.update({userId, cartId:cartId,total})){
      throw new Error("No existen ordenes que atualizar")
    }
    console.log("newTotal:", total)
  }

  async all() {
    return await this.orderRepocitory.findAll();
  }

  async getByUser(userId:number) {
    return await this.orderRepocitory.getByUserId(userId);
  }

  async delete(id: number) {
    const deleted = await this.orderRepocitory.delete(id);
    if(deleted){
      return deleted
    }else{
      throw new Error("No existe un elemento con el id "+ id)
    }
  }
}
