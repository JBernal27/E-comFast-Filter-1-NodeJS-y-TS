import { Role } from "../models/role";
import { User } from "../models/user";
import { injectable } from "tsyringe";

@injectable()
export default class UserRepository {
  async create(user: Partial<User>) {
    return await User.create(user);
  }

  async findAll() {
    return await User.findAll({include:[
      {
        model: Role,
        required: true
      }
    ]});
  }

  async findById(id: number) {
    return await User.findByPk(id,{include:{
      model: Role,
      required: true
    }});
  }

  async findByEmail(email: string) {
    return await User.findOne({ where: { email } });
  }

  async delete(id:number){
    return await User.destroy({where:{id}})
  }

  async update(id: number, user: Partial<User>) {
    return await User.update(user, { where: { id } });
  }
}
