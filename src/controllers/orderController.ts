import OrderService from "../services/orderService";
import { container } from "tsyringe";
import { Request, Response } from "express";
import ProductCartService from "../services/productCartService";
import { getTokenInformationHelper } from "../helpers/getTokenInfoHelper";

export default class ProductController {

  static async getByUser(req: Request ,res:Response){
    const tokenInfo = getTokenInformationHelper(req, res)
    if (tokenInfo) {
      const orderService = container.resolve(OrderService);
      const products = await orderService.getByUser(tokenInfo.id);
      res.status(200).json({status:200, data:products})
    }else{
      res.status(401).json({
        status:410,
        message:"Debes tener una sesion iniciada"
      })
    }
  }

  static async updateOrder(req:Request, res:Response){
    const tokenInfo = getTokenInformationHelper(req, res)
    if (tokenInfo) {
      const orderService = container.resolve(OrderService);
      const productCartService = container.resolve(ProductCartService)
      const productCart = await productCartService.findByCart(req.body.cartId)
      await orderService.update(tokenInfo.id,productCart,req.body.cartId);
      const products = await orderService.getByUser(tokenInfo.id)
      res.status(200).json({status:200, data:products})
    }else{
      res.status(401).json({
        status:410,
        message:"Debes tener una sesion iniciada"
      })
    }
  }
  
  static async createOrder(req: Request, res: Response) {
    const tokenInfo = getTokenInformationHelper(req, res)
    if (tokenInfo) {
      const productCartService = container.resolve(ProductCartService)
      const productCart = await productCartService.findByCart(req.body.cartId)
      if (productCart.length > 0) {
        const orderService = container.resolve(OrderService);
        const order = await orderService.create(tokenInfo.id,productCart,req.body.cartId);
        res.status(201).json({
          status: 201,
          data: order
        });
      }else{
        res.status(400).json({
          status: 400,
          message: "No se ha añadido ningun producto al carrito"
        })
      }
    }else{
      res.status(401).json({
        status:410,
        message:"Debes tener una sesion iniciada"
      })
    }
  }

  static async getAll(req: Request, res: Response) {
    const orderService = container.resolve(OrderService);
    const products = await orderService.all();
    res.status(200).json({
      status: 200,
      data: products
    });
  }

  static async delete(req: Request, res: Response) {
    try {
      const orderService = container.resolve(OrderService);
      if (!isNaN(Number(req.params.id))) {
        await orderService.delete(Number(req.params.id));
        res.status(200).json({
          status: 200,
          message: "El elemento de id " + req.params.id + " fue eliminado con exito"
        });
      } else {
        throw new Error("El id ingresado no es numerico")
      }
    } catch (error) {
      res.status(400).json({
        status: 400,
        message:
          error instanceof Error
            ? error.message
            : "An unexpected error occurred",
      });
    }
  }
}