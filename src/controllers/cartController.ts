import CartService from "../services/cartService";
import { container } from "tsyringe";
import { Request, Response } from "express";
import ProductCartService from "../services/productCartService";
import ProductService from "../services/productService";
import { getTokenInformationHelper } from "../helpers/getTokenInfoHelper";
import { ProductCart } from "../models/productCart";

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

  static async delete(req: Request, res: Response) {
    try {
      const cartService = container.resolve(CartService);
      if (!isNaN(Number(req.params.id))) {
        await cartService.findById(Number(req.params.id))
        await cartService.delete(Number(req.params.id));
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

  // static async changeStock(req: Request, res: Response) {
  //   try {
  //     const productCartService = container.resolve(ProductCartService)
  //     if (!isNaN(Number(req.body.id)) && !isNaN(Number(req.body.stock))) {
  //       await productCartService.chageQuantity(req.body);
  //       const product = await productCartService.findByCart(req.body.id);
  //       res.status(200).json({
  //         status: 200,
  //         data: product,
  //       });
  //     }else{
  //       throw new Error ("Los valores ingresados deben ser numericos")
  //     }
  //   } catch (error) {
  //     res.status(400).json({
  //         status: 400,
  //         message: error instanceof Error ? error.message : 'An unexpected error occurred'
  //     });
  // }
  // }

  static async addToCart(req: Request, res: Response) {
    try {
      const tokenInfo = getTokenInformationHelper(req, res)
      if (tokenInfo?.id && req.body.productId && req.body.quantity) {
        if (
          !isNaN(Number(req.body.productId)) &&
          !isNaN(Number(req.body.quantity))
        ) {
          const cartService = container.resolve(CartService);
          const productCartService = container.resolve(ProductCartService);
          const productService = container.resolve(ProductService);
          const cart = await cartService.findByUser(tokenInfo.id);
          const product = await productService.getById(req.body.productId);
          if (product) {
            if (!cart) {
              const newCart = await cartService.create(tokenInfo.id);
              await productCartService.create(
                Number(newCart.id),
                Number(req.body.productId),
                Number(req.body.quantity)
              );
            } else {
              const productExist = await productCartService.isProductAdded(Number(cart.id), Number(req.body.productId))
              if (productExist) {
                await productCartService.chageQuantity(
                  Number(cart.id),
                  Number(req.body.productId),
                  Number(req.body.quantity),
                  productExist.quantity
                );
              } else {
                await productCartService.create(
                  Number(cart.id),
                  Number(req.body.productId),
                  Number(req.body.quantity)
                );
              }

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
