import { hash, genSalt } from "bcrypt";

import { CreateUserRequestDTO } from "../dtos/CreateUserRequestDTO";
import { IUser } from "../interfaces/IUser";
import { User } from "../models/User";

export class UsersService {
  public async findByEmail(email: string): Promise<IUser> {
    return await User.findOne({ email }).lean().exec();
  }

  public async create(data: CreateUserRequestDTO): Promise<IUser> {
    const { name, email, password } = data;

    const passwordHash = await hash(password, 10);

    return await User.create({ name, email, password: passwordHash });
  }
}
