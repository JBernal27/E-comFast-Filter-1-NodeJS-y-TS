import ProductService from "../services/productService";
import { container } from "tsyringe";
import { Request, Response } from "express";

export default class ProductController {
  static async createProduct(req: Request, res: Response) {
    const productService = container.resolve(ProductService);
    const productExist = await productService.getByName(req.body.name)
    if (!productExist) {
      const product = await productService.create(req.body);
      res.status(201).json({
        status: 201,
        data: product
      });
    } else {
      res.status(400).json({
        status: 400,
        message: `Ya existe un producto con el nombre '${req.body.name}'`
      })
    }
  }

  static async getAll(req: Request, res: Response) {
    const productService = container.resolve(ProductService);
    const products = await productService.all();
    console.log("por aca pase: Controller");
    res.status(200).json({
      status: 200,
      data: products
    });
  }

  static async changeStock(req: Request, res: Response) {
    try {
      const productService = container.resolve(ProductService)
      if (!isNaN(Number(req.body.id)) && !isNaN(Number(req.body.stock))) {
        await productService.chageStock(req.body);
        const product = await productService.getById(req.body.id);
        res.status(200).json({
          status: 200,
          data: product,
        });
      } else {
        throw new Error("Los valores ingresados deben ser numericos")
      }
    } catch (error) {
      res.status(400).json({
        status: 400,
        message: error instanceof Error ? error.message : 'An unexpected error occurred'
      });
    }
  }

  static async getById(req: Request, res: Response) {
    try {
      const productService = container.resolve(ProductService);
      if (!isNaN(Number(req.params.id))) {
        const user = await productService.getById(Number(req.params.id));
        res.status(200).json({
          status: 200,
          data: user,
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

  static async delete(req: Request, res: Response) {
    try {
      const productService = container.resolve(ProductService);
      if (!isNaN(Number(req.params.id))) {
        await productService.getById(Number(req.params.id))
        await productService.delete(Number(req.params.id));
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