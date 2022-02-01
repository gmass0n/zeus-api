import { NextFunction, Request, Response } from "express";
import * as jwt from "jsonwebtoken";

import { AppError } from "../errors/AppError";
import { IUser } from "../interfaces/IUser";

export function authHandler(
  req: Request,
  res: Response,
  next: NextFunction
): void {
  const bearerToken = req.headers.authorization;

  const token = bearerToken.split(" ")[1];

  if (!token) {
    throw new AppError({
      message: "You need to inform an authentication token.",
      tag: "AUTH_TOKEN_REQUIRED",
      statusCode: 403,
    });
  }

  try {
    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET
    ) as unknown as IUser;

    req.user = decoded;
  } catch (err) {
    throw new AppError({
      message: "Authentication token is invalid.",
      tag: "AUTH_TOKEN_INVALID",
      statusCode: 401,
    });
  }

  next();
}
