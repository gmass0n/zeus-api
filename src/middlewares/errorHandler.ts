import { NextFunction, Request, Response } from "express";

import { AppError } from "../errors/AppError";

export function errorHandler(
  error: any,
  request: Request,
  response: Response,
  next: NextFunction
): Response {
  console.log("🧨 Ocurred an error,", error);

  if (error instanceof AppError) {
    return response
      .status(error.statusCode)
      .json({ error: error.message, ...(error.tag && { tag: error.tag }) });
  }

  return response.status(500).json({
    error: "Ocurred an internal server error",
    tag: "INTERNAL_SERVER_ERROR",
  });
}
