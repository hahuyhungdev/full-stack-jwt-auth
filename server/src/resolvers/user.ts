import argon2 from "argon2";
import { Arg, Mutation, Resolver } from "type-graphql";
import { User } from "../entities/User";
import { LoginInput } from "../types/LoginInput";
import { RegisterInput } from "../types/RegisterInput";
import { UserMutationResponse } from "../types/UserMutationResponse";
import { createToken } from "../utils/auth";

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
  @Mutation((_returns) => UserMutationResponse)
  async login(@Arg("loginInput") { username, password }: LoginInput): Promise<UserMutationResponse> {
    const existingUser = await User.findOne({ username });
    if (!existingUser) {
      return {
        code: 404,
        success: false,
        message: "User not found",
      };
    }
    const validPassword = await argon2.verify(existingUser.password, password);
    if (!validPassword) {
      return {
        code: 400,
        success: false,
        message: "Invalid password",
      };
    }
    return {
      code: 200,
      success: true,
      message: "User logged in",
      user: existingUser,
      accsessToken: createToken(existingUser),
    };
  }
}
