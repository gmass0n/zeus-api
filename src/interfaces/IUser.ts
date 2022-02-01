import { UserRecurrencyStatusEnum } from "../enums/UserRecurrencyStatusEnum";
import { UserTypeEnum } from "../enums/UserTypeEnum";

export interface IUser {
  _id: string;
  name: string;
  email: string;
  password: string;
  type: UserTypeEnum;
  status?: UserRecurrencyStatusEnum;
}
