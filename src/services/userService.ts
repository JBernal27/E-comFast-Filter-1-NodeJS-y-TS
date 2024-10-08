import UserRepository from "../repositories/userRepository";
import { User } from "../models/user";
import { inject, injectable } from "tsyringe";
import jwt from "jsonwebtoken";

@injectable()
export default class UserService {
  constructor(@inject(UserRepository) private userRepocitory: UserRepository) { }

  async create(user: User) {
    return await this.userRepocitory.create(user);
  }

  async all() {
    return await this.userRepocitory.findAll();
  }

  async findById(id: number) {
    const user = await this.userRepocitory.findById(id);
    if (user) {
      return user;
    } else throw new Error("No extiste un usuario con ese ID");
  }

  async getUserByEmail(user: User) {
    const userFounded: User | null = await this.userRepocitory.findByEmail(
      user.email
    );
    const secretKey: string = "clan-ritchie"; // Entiendo que es mala practica, pero no queria funcionar con el .env

    const options: jwt.SignOptions = {
      expiresIn: "1h",
      algorithm: "HS256",
    };

    if (!userFounded) {
      throw new Error("User not found");
    } else if (user.password == userFounded.password) {
      const payload = {
        id: userFounded.id,
        email: userFounded.email,
        roleId: userFounded.roleId,
      };

      const token = jwt.sign(payload, secretKey, options); // hs256 es el tipo de algoritmo automaticamente generado por JWT
      return token;
    } else {
      throw new Error("Wrong password");
    }
  }

  async delete(id: number) {
    return await this.userRepocitory.delete(id)
  }

  async update(id: number, user: Partial<User>, tokenUserId: number, TokenRoleId: number) {
    if (!isNaN(id)) {
      const allowedFields = ['email', 'password'];
      if (TokenRoleId == 2 && tokenUserId != id) {
        throw new Error("Solo puedes actualizar tus datos");
      }
      TokenRoleId == 1 && allowedFields.push('roleId')
      const userKeys = Object.keys(user);
      if (!userKeys.every(key => allowedFields.includes(key))) {
        throw new Error("Los campos a modificar no son correctos");
      }
    } else {
      throw new Error("El id ingresado no es numérico");
    }

    await this.userRepocitory.update(id, user);
    return await this.userRepocitory.findById(id);
  }
}
