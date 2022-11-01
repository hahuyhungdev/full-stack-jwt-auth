import { User } from "../entities/User";
import { Secret, sign } from "jsonwebtoken";

export const createToken = (user: User) => {
  return sign({ userId: user.id }, process.env.ACCESS_TOKEN_SECRET as Secret, {
    expiresIn: "15m",
  });
};
