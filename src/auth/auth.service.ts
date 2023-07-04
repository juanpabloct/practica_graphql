import {
  BadRequestException,
  Inject,
  Injectable,
  Logger,
  forwardRef,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { EncryptPaswordService } from 'src/common/encryptPassword.service';
import { PrismaService } from 'src/prisma-db/prisma-db.service';
import { CreateUserInput } from 'src/auth/inputs/create-user.input';
import { UserService } from 'src/user/user.service';
import { SingInInput } from './inputs/sing-in.input';
@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly passwordService: EncryptPaswordService,
    @Inject(forwardRef(() => UserService))
    private readonly userService: UserService,
    private readonly jwt: JwtService,
  ) {}
  logger = new Logger();

  async SingUp(createUserInput: CreateUserInput) {
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
  async SingIn({ email, password }: CreateUserInput): Promise<SingInInput> {
    try {
      const { password: passwordEmail, ...infoEmail } =
        await this.userService.findForEmail(email);
      const validatePassword = await this.passwordService.EqualPassword(
        password,
        passwordEmail,
      );
      if (validatePassword) {
        const tokenGenerate = this.jwt.sign(infoEmail);
        return { password: passwordEmail, ...infoEmail, token: tokenGenerate };
      } else {
        throw new BadRequestException('Credentiasl are incorrects');
      }
    } catch (error) {
      this.ErrorLogin(error);
      return error;
    }
  }
  ErrorLogin(error: Error) {
    this.logger.error(error.message);
  }
}
