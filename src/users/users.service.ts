import { Injectable } from '@nestjs/common';
import { PrismaService } from '@src/prisma/prisma.service';
import { User } from '@generated/prisma';
import { randomUUID } from 'crypto';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  create(username: string, role: string): Promise<User> {
    return this.prisma.user.create({
      data: { id: randomUUID(), username, role, createdAt: new Date() },
    });
  }

  findAll(): Promise<User[]> {
    return this.prisma.user.findMany();
  }
}
