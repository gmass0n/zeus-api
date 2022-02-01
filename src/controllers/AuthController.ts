import { Request, Response } from "express";
import { SignInRequestDTO } from "../dtos/SignInRequestDTO";
import { SignInResponseDTO } from "../dtos/SignInResponseDTO";
import { AuthService } from "../services/AuthService";

export class AuthController {
  public async signIn(
    req: Request<any, any, SignInRequestDTO>,
    res: Response<SignInResponseDTO>
  ): Promise<Response> {
    const { email, password } = req.body;

    const authService = new AuthService();

    const response = await authService.signIn({ email, password });

    return res.status(201).json(response);
  }
}
