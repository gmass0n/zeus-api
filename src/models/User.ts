import { v4 } from "uuid";
import { Schema, model } from "mongoose";

import { IUser } from "../interfaces/IUser";
import { UserTypeEnum } from "../enums/UserTypeEnum";

const UserSchema = new Schema<IUser>(
  {
    _id: {
      type: String,
      default: v4,
    },
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      required: false,
      enum: UserTypeEnum,
      default: UserTypeEnum.customer,
    },
  },
  { timestamps: true }
);

export const User = model("User", UserSchema);
