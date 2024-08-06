import OrderService from "../services/orderService";
import { container } from "tsyringe";
import { Request, Response } from "express";

export default class ProductController {
  static async createProduct(req: Request, res: Response) {
    const orderService = container.resolve(OrderService);
    const product = await orderService.create(req.body);
    res.status(201).json({
      status: 201,
      data: product
    });
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
      }else{
        throw new Error ("El id ingresado no es numerico")
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