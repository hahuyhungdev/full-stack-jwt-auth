import { checkAuth } from "../middleware/checkAuth";
import { Ctx, Query, Resolver, UseMiddleware } from "type-graphql";
import { User } from "../entities/User";
import { Context } from "../types/Context";

@Resolver()
export class GreetingResolver {
  @Query((_returns) => String)
  @UseMiddleware(checkAuth)
  async hello(@Ctx() { user }: Context): Promise<string> {
    const existingUser = await User.findOne(user.userId);
    if (!existingUser) {
      return "User not found";
    }
    return `Hello ${existingUser.username}`;
  }
}
