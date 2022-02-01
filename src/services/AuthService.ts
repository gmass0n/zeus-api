import * as jwt from "jsonwebtoken";
import * as bcrypt from "bcrypt";
import axios from "axios";

import { User } from "../models/User";

import { SignInRequestDTO } from "../dtos/SignInRequestDTO";
import { SignInResponseDTO } from "../dtos/SignInResponseDTO";

import { UsersService } from "./UsersService";
import { IUser } from "../interfaces/IUser";
import { AppError } from "../errors/AppError";
import { PagarmeService } from "./PagarMeService";
import { UserTypeEnum } from "../enums/UserTypeEnum";
import { UserRecurrencyStatusEnum } from "../enums/UserRecurrencyStatusEnum";

export class AuthService {
  private async validatePassword(
    password: string,
    encryptedPassword: string
  ): Promise<void> {
    const isValid = await bcrypt.compare(password, encryptedPassword);

    if (!isValid) {
      throw new AppError({
        message: "User password is invalid.",
        tag: "USER_PASSWORD_INVALID",
        statusCode: 401,
      });
    }
  }

  public async signIn(data: SignInRequestDTO): Promise<SignInResponseDTO> {
    const { email, password } = data;

    const pagarmeService = new PagarmeService();

    let user: IUser = null;

    const findUser = await User.findOne({ email }).lean().exec();

    if (!findUser) {
      const customer = await pagarmeService.findCustomerByEmail(email);

      if (!customer) {
        throw new AppError({
          message: "Customer with e-mail informed not found.",
          statusCode: 404,
          tag: "PAGARME_ERROR",
        });
      }

      const usersService = new UsersService();

      const createdUser = await usersService.create({
        email,
        name: customer.name,
        password,
      });

      user = createdUser;
    } else {
      await this.validatePassword(password, findUser.password);

      user = findUser;
    }

    delete user.password;

    const token = jwt.sign(
      {
        name: user.name,
        email: user.email,
      },
      process.env.JWT_SECRET
    );

    const userRecurrencyStatus =
      user.type === UserTypeEnum.customer
        ? await pagarmeService.validateCustomerRecurrency(user.email)
        : UserRecurrencyStatusEnum.authorized;

    return {
      user: {
        ...user,
        status: userRecurrencyStatus,
      },
      token,
    };
  }
}
