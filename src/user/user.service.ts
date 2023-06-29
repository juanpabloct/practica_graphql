import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';
import { PrismaService } from 'src/prisma-db/prisma-db.service';

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}
  async create(createUserInput: CreateUserInput) {
    try {
      const newUser = await this.prisma.user.create({
        data: {
          ...createUserInput,
        },
      });
      return newUser;
    } catch (error) {
      throw new BadRequestException({ message: error.message });
    }
  }

  async findAll() {
    return await this.prisma.user.findMany({
      select: {
        email: true,
        idUser: true,
      },
    });
  }

  async findOne(id: number) {
    return await this.prisma.user.findUniqueOrThrow({
      where: {
        idUser: id,
      },
    });
  }

  async update(updateUser: UpdateUserInput) {
    return await this.prisma.user.update({
      where: { idUser: updateUser.idUser },
      data: updateUser,
    });
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
