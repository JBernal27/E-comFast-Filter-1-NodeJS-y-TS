import CartService from "../services/cartService";
import { container } from "tsyringe";
import { Request, Response } from "express";
import ProductCartService from "../services/productCartService";
import ProductService from "../services/productService";

export default class CartController {
  static async createCart(req: Request, res: Response) {
    const cartService = container.resolve(CartService);
    const cart = await cartService.create(req.body);
    res.status(201).json({
      status: 201,
      data: cart,
    });
  }

  static async getAll(req: Request, res: Response) {
    const cartService = container.resolve(CartService);
    const carts = await cartService.all();
    res.status(200).json({
      status: 200,
      data: carts,
    });
  }

  static async addToCart(req: Request, res: Response) {
    console.log(req.body);
    try {
      if (req.body.userId && req.body.productId && req.body.quantity) {
        if (
          !isNaN(Number(req.body.userId)) &&
          !isNaN(Number(req.body.productId)) &&
          !isNaN(Number(req.body.quantity))
        ) {
          const cartService = container.resolve(CartService);
          const productCartService = container.resolve(ProductCartService);
          const productService = container.resolve(ProductService);
          const cart = await cartService.findByUser(req.body.userId);
          const product = await productService.getById(req.body.productId);
          if (product) {
              if (!cart) {
              const newCart = await cartService.create(req.body.userId);
              await productCartService.create(
                Number(newCart.id),
                Number(req.body.productId),
                Number(req.body.quantity)
              );
            } else {
              await productCartService.create(
                Number(cart.id),
                Number(req.body.productId),
                Number(req.body.quantity)
              );
            }
            res.status(201).json({
              status: 201,
              message: "Product added to cart",
            });
          } else {
            throw new Error("No existe el producto que se intenta añadir");
          }
        } else {
          throw new Error("Los valores de los campos deben ser numericos");
        }
      } else {
        throw new Error("Hacen Falta Campos");
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
