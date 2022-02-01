export type AppErrorTag =
  | "USER_PASSWORD_INVALID"
  | "INTERNAL_SERVER_ERROR"
  | "USER_NOT_FOUND"
  | "AUTH_TOKEN_INVALID"
  | "AUTH_TOKEN_REQUIRED"
  | "PAGARME_ERROR";

export class AppError {
  message: string;

  tag?: AppErrorTag;

  statusCode?: number;

  constructor({ message, tag, statusCode }: AppError) {
    this.tag = tag;
    this.message = message;
    this.statusCode = statusCode || 500;
  }
}
