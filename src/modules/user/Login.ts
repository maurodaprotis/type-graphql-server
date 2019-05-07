import { Resolver, Mutation, Arg, Ctx } from "type-graphql";
import bcrypt from "bcryptjs";
import { User } from "../../entity/User";
import { LoginInput } from "./login/LoginInput";
import { Context } from "../../types/Context";

@Resolver()
export class LoginResolver {
  @Mutation(() => User, { nullable: true })
  async login(
    @Arg("input")
    { email, password }: LoginInput,
    @Ctx() ctx: Context
  ): Promise<User | null> {
    const user = await User.findOne({ where: { email } });
    if (!user) throw new Error("Invalid Email");

    const valid = await bcrypt.compare(password, user.password);

    if (!valid) throw new Error("invalid password");

    /* if (!user.confirmed) return null; */

    ctx.req.session!.userId = user.id;

    return user;
  }
}
