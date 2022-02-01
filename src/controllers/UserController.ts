import { Request, Response } from "express";

import { AppError } from "../errors/AppError";
import { PagarmeService } from "../services/PagarMeService";
import { UsersService } from "../services/UsersService";

export class UserController {
  public async show(req: Request, res: Response): Promise<Response> {
    const usersService = new UsersService();

    const user = await usersService.findByEmail(req.user?.email);

    if (!user) {
      throw new AppError({
        message: "User not found",
        statusCode: 404,
        tag: "USER_NOT_FOUND",
      });
    }

    const pagarmeService = new PagarmeService();

    const userRecurrencyStatus =
      await pagarmeService.validateCustomerRecurrency(user.email);

    return res.json({ ...user, status: userRecurrencyStatus });
  }
}
