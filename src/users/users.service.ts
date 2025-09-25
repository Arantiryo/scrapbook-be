import { Injectable } from '@nestjs/common';
import { PrismaService } from '@src/prisma/prisma.service';
import { User } from '@generated/prisma';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  // create(name: string, email: string): Promise<User> {
  //   return this.prisma.user.create({
  //     data: { name, email },
  //   });
  // }

  findAll(): Promise<User[]> {
    return this.prisma.user.findMany();
  }
}
