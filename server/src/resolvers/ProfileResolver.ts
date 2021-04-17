import { Resolver } from 'type-graphql';

@Resolver()
export class ProfileResolver {
  // @Mutation(() => RegisterProfileResponse)
  // registerProfile(
  //   @Arg('username') username: string,
  //   @Arg('phone') phone: string,
  //   @Arg('first') first: string,
  //   @Arg('last') last: string,
  //   @Arg('bio') bio: string,
  //   @Ctx() { payload }: MyContext
  // ) {
  //   console.log('PAYLOAD', payload);
  //   console.log('USERNAME', username);
  //   console.log('PHONE', phone);
  //   console.log('FIRST', first);
  //   console.log('LAST', last);
  //   console.log('BIO', bio);
  //   return { response: false, message: 'nah bruh' };
  // }
  //   @Query(() => String)
  //   hello() {
  //     return 'hi!';
  //   }
  //   @Query(() => String)
  //   @UseMiddleware(isAuth)
  //   bye(@Ctx() { payload }: MyContext) {
  //     return `your user id is: ${payload!.userId}`;
  //   }
  //   @Query(() => [User])
  //   users() {
  //     return User.find();
  //   }
  //   @Query(() => User, { nullable: true })
  //   me(@Ctx() context: MyContext) {
  //     const authorization = context.req.headers['authorization'];
  //     if (!authorization) {
  //       return null;
  //     }
  //     try {
  //       const token = authorization.split(' ')[1];
  //       const payload: any = verify(token, process.env.ACCESS_TOKEN_SECRET!);
  //       return User.findOne(payload.userId);
  //     } catch (err) {
  //       console.log(err);
  //       return null;
  //     }
  //   }
  //   @Query(() => UserResponse, { nullable: true })
  //   @UseMiddleware(isAuth)
  //   async getUser(@Ctx() { payload }: MyContext, @Arg('path') path: string) {
  //     const userId = path.split('/')[path.split('/').length - 1];
  //     const isMe = payload!.userId == userId;
  //     const user = await User.findOne({ where: { id: userId } });
  //     if (!user) {
  //       throw new Error('could not find user');
  //     }
  //     return { me: isMe, user };
  //   }
  //   @Mutation(() => LoginResponse)
  //   async login(
  //     @Arg('email') email: string,
  //     @Arg('password') password: string,
  //     @Ctx() { res }: MyContext
  //   ): Promise<LoginResponse> {
  //     const user = await User.findOne({ where: { email } });
  //     if (!user) {
  //       throw new Error('could not find user');
  //     }
  //     const valid = await compare(password, user.password);
  //     if (!valid) {
  //       throw new Error('invalid password');
  //     }
  //     sendRefreshToken(res, createRefreshToken(user));
  //     return {
  //       accessToken: createAccessToken(user),
  //       user
  //     };
  //   }
  //   @Mutation(() => RegisterResponse)
  //   async register(
  //     @Arg('email') email: string,
  //     @Arg('password') password: string
  //   ) {
  //     const valid = email.match(/^\S+@\S+\.\S+$/g);
  //     if (!valid) {
  //       return {
  //         res: false,
  //         message: 'Please enter a valid email address...'
  //       };
  //     }
  //     if (!password) {
  //       return {
  //         res: false,
  //         message: 'Please enter a valid password...'
  //       };
  //     }
  //     const existing = await User.findOne({ where: { email } });
  //     if (existing) {
  //       return {
  //         res: false,
  //         message: 'Looks like this email already taken. Please try again...'
  //       };
  //     }
  //     const hashedPassword = await hash(password, 12);
  //     try {
  //       await User.insert({ email, password: hashedPassword });
  //     } catch (err) {
  //       console.log(err);
  //       return {
  //         res: false,
  //         message: 'Internal server error. Try again later...'
  //       };
  //     }
  //     return { res: true, message: `Congrats, you're registered!` };
  //   }
  //   @Mutation(() => Boolean)
  //   async revokeRefreshTokensForUser(@Arg('userId', () => Int) userId: number) {
  //     await getConnection()
  //       .getRepository(User)
  //       .increment({ id: userId }, 'tokenVersion', 1);
  //     return true;
  //   }
  //   @Mutation(() => Boolean)
  //   async logout(@Ctx() { res }: MyContext) {
  //     sendRefreshToken(res, '');
  //     return true;
  //   }
}
