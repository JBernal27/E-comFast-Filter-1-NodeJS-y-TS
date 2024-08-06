import UserService from "../services/userService";
import { container } from "tsyringe";
import { Request, Response } from "express";

export default class UserController {
  static async createUser(req: Request, res: Response) {
    const userService = container.resolve(UserService);
    const user = await userService.create(req.body);
    res.status(201).json({
      status: 201,
      data: user,
    });
  }

  static async getAll(req: Request, res: Response) {
    const userService = container.resolve(UserService);
    const users = await userService.all();
    res.status(200).json({
      status: 200,
      data: users,
    });
  }

  static async login(req: Request, res: Response) {
    const userService = container.resolve(UserService);
    const token = await userService.getUserByEmail(req.body);
    res.status(200).json({
      status:"200",
      token: token
    });
  }

  static async getById(req: Request, res: Response) {
    try {
      const userService = container.resolve(UserService);
      if (!isNaN(Number(req.params.id))) {
        const user = await userService.findById(Number(req.params.id));
        res.status(200).json({
          status: 200,
          data: user,
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
