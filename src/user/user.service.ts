import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { UpdateUserInput } from './dto/inputs/update-user.input';
import { PrismaService } from 'src/prisma-db/prisma-db.service';

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}
  logger = new Logger();
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
  async findForEmail(email: string) {
    try {
      const user = await this.prisma.user.findUniqueOrThrow({
        where: {
          email,
        },
      });
      return user;
    } catch (error) {
      throw new BadRequestException({
        message: `Not fount user with email: ${email}`,
      });
    }
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
  ErrorUser(error: any) {
    this.logger.error(error.message);
  }
}
