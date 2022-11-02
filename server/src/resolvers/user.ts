import argon2 from "argon2";
import { Context } from "../types/Context";
import { Arg, Ctx, Mutation, Resolver } from "type-graphql";
import { User } from "../entities/User";
import { RegisterInput } from "../types/RegisterInput";
import { UserMutationResponse } from "../types/UserMutationResponse";
import { createToken, sendRefreshToken } from "../utils/auth";
import { LoginInput } from "../types/LoginInput";

@Resolver()
export class UserResolver {
  @Mutation((_returns) => UserMutationResponse)
  async register(
    @Arg("registerInput")
    registerInput: RegisterInput
  ): Promise<UserMutationResponse> {
    const { username, password } = registerInput;
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return {
        code: 400,
        success: false,
        message: "User already exists",
      };
    }
    const hashedPassword = await argon2.hash(password);
    const newUser = await User.create({
      username,
      password: hashedPassword,
    }).save();
    return {
      code: 200,
      success: true,
      message: "User created",
      user: newUser,
    };
  }
  // login
  @Mutation((_return) => UserMutationResponse)
  async login(
    @Arg("loginInput") { username, password }: LoginInput,
    @Ctx() { res }: Context
  ): Promise<UserMutationResponse> {
    1;
    const existingUser = await User.findOne({ username });
    if (!existingUser) {
      return {
        code: 400,
        success: false,
        message: "User not found",
      };
    }
    1;

    const isPasswordValid = await argon2.verify(existingUser.password, password);

    if (!isPasswordValid) {
      return {
        code: 400,
        success: false,
        message: "Incorrect password",
      };
    }
    sendRefreshToken(res, existingUser);
    return {
      code: 200,
      success: true,
      message: "Logged in successfully",
      user: existingUser,
      accessToken: createToken("accessToken", existingUser),
    };
  }
}
1;
