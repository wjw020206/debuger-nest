import { Injectable } from '@nestjs/common';
import { RegisterDto } from './dto/register.dto';
import { PrismaService } from 'src/common/prisma.service';
import { hash, verify } from 'argon2';
import { LoginDto } from './dto/login.dto';
import { validateFail } from 'src/helper';
import { User } from '@prisma/client';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private jwt: JwtService
  ) {}

  async register(dto: RegisterDto) {
    const user = await this.prisma.user.create({
      data: {
        ...dto,
        password: await hash(dto.password)
      }
    });
    return user;
  }

  private token(user: User) {
    return {
      token: this.jwt.sign({ id: user.id })
    };
  }

  async login(dto: LoginDto) {
    const user = await this.prisma.user.findFirst({
      where: {
        email: dto.email
      }
    });

    if (!user) {
      validateFail('邮箱未注册');
    } else if (!(await verify(user.password, dto.password))) {
      validateFail('邮箱或密码输入错误');
    } else {
      return this.token(user);
    }
  }
}
