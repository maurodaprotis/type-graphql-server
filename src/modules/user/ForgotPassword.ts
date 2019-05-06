import { v4 } from 'uuid';
import { Resolver, Mutation, Arg } from 'type-graphql';
import { User } from '../../entity/User';
import { redis } from '../../redis';
import { sendEmail } from '../utils/sendEmail';
import { forgotPasswordPrefix } from '../constants/redisPrefixes';

@Resolver()
export class ForgotPasswordResolver {
  @Mutation(() => Boolean)
  async forgotPassword(@Arg('email') email: string): Promise<Boolean> {
    const user = await User.findOne({ where: { email } });

    if (user) {
      const token = v4();

      await redis.set(
        forgotPasswordPrefix + token,
        user.id,
        'ex',
        60 * 60 * 24
      ); // 1 day exp
      await sendEmail(
        email,
        `http://localhost:3000/user/change-password/${token}`
      );
    }
    return true;
  }
}
