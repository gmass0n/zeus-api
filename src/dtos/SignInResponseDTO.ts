import { IUser } from "../interfaces/IUser";

export class SignInResponseDTO {
  user: Omit<IUser, "password">;
  token: string;
}
