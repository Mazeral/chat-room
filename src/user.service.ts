import { Injectable } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { User, Prisma } from '@prisma/client';
import * as bcrypt from 'bcrypt';
@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async createUser(
    username: string,
    password: string,
    email: string,
  ): Promise<User> {
    return this.prisma.user.create({
      data: { userName: username, email: email, passWord: password },
    });
  }

  /* async users(params: {
    //parameter option for the search
    skip?: number;
    take?: number;
    cursor?: Prisma.UserWhereUniqueInput;
    where?: Prisma.UserWhereInput;
    orderBy?: Prisma.UserOrderByWithRelationInput;
  }): Promise<User[]> { //Returns an array of users
    const { skip, take, cursor, where, orderBy } = params;
    return this.prisma.user.findMany({
      //The function that return the users, depending on the parameters if they exist or not.
      skip,
      take,
      cursor,
      where,
      orderBy,
    });*/

  async user(
    //Search a user by a unique value, username in out case:
    userWhereUniqueInput: Prisma.UserWhereUniqueInput, //the red one can be named anything, the yellow one is the type
  ): Promise<User | null> {
    //The null here is because we might end up by not finding any user with the wanted details
    return this.prisma.user.findUnique({
      where: userWhereUniqueInput,
    });
  }

  //using bcrypt to hash the password!
  async pwdcrpt(password: string): Promise<string> {
    return await bcrypt.hashSync(password, 10);
  }
}
