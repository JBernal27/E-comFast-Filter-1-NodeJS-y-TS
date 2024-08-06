import { User } from "../models/user";
import { injectable } from "tsyringe";

@injectable()
export default class UserRepository {
  async create(user: Partial<User>) {
    return await User.create(user);
  }

  async findAll() {
    return await User.findAll();
  }

  async findById(id: number) {
    return await User.findByPk(id);
  }

  async findByEmail(email: string) {
    return await User.findOne({ where: { email } });
  }
}
