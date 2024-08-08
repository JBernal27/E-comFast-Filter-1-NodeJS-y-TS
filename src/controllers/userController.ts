import UserService from "../services/userService";
import { container } from "tsyringe";
import { Request, Response } from "express";
import { getTokenInformationHelper } from "../helpers/getTokenInfoHelper";

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
    try {
      const userService = container.resolve(UserService);
      const token = await userService.getUserByEmail(req.body);
      res.status(200).json({
        status: "200",
        token: token
      });
    } catch (error) {
      res.status(400).json({
        status: 404,
        message:
          error instanceof Error
            ? error.message
            : "An unexpected error occ  urred",
      });
    }
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

  static async updateUser(req: Request, res: Response) {
    try {
        const userId = Number(req.params.id);
        const tokenInfo = getTokenInformationHelper(req, res);
        const userService = container.resolve(UserService);
        const updatedUser = tokenInfo && await userService.update(userId, req.body, tokenInfo.roleId, tokenInfo.id);
        res.status(200).json({
            status: 200,
            data: updatedUser,
        });
    } catch (error) {
        res.status(400).json({
            status: 400,
            message: error instanceof Error ? error.message : "An unexpected error occurred",
        });
    }
}

  static async deleteUser(req: Request, res: Response) {
    try {
      const tokenInfo = getTokenInformationHelper(req, res)
      const userService = container.resolve(UserService);
      if (!isNaN(Number(req.params.id))) {
        if (Number(req.params.id) != tokenInfo?.id) {
          if (await userService.delete(Number(req.params.id))) {
            res.status(200).json({
              status: 200,
              message: "El elemento de id " + req.params.id + " fue eliminado con exito"
            });
          } else {
            throw new Error("El usuario que intenta eliminar no existe")
          }
        } else {
          throw new Error("El usuario actual no puede eliminarse a si mismo")
        }
      } else {
        throw new Error("El id ingresado no es numerico")
      }
    }
    catch (error) {
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
