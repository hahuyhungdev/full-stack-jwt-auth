import { AuthenticationError } from "apollo-server-core";
import { Secret, verify } from "jsonwebtoken";
import { MiddlewareFn } from "type-graphql";
import { Context } from "../types/Context";
import { UserAuthPayload } from "../types/UserAuthPayload";

export const checkAuth: MiddlewareFn<Context> = async ({ context }, next) => {
  try {
    const authHeader = context.req.header("Authorization");
    const accessToken = authHeader && authHeader.split(" ")[1];
    if (!accessToken) {
      throw new AuthenticationError("Access token not found");
    }
    const decodeUser = verify(accessToken, process.env.ACCESS_TOKEN_SECRET as Secret) as UserAuthPayload;
    context.user = decodeUser;
    return next();
  } catch (err) {
    throw new AuthenticationError(`Authentication error: ${JSON.stringify(err)}`);
  }
};
