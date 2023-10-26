import { Injectable } from '@nestjs/common';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from 'src/common/prisma.service';
import { UserPasswordDto } from './dto/password.dto';
import { hash } from 'argon2';
import { UserEmailDto } from './dto/email.dto';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}
  findAll() {
    return `This action returns all user`;
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, dto: UpdateUserDto) {
    return this.prisma.user.update({
      where: {
        id
      },
      data: {
        ...dto
      }
    });
  }

  async updatePassword(id: number, dto: UserPasswordDto) {
    return this.prisma.user.update({
      where: {
        id
      },
      data: {
        password: await hash(dto.password)
      }
    });
  }

  async updateEmail(id: number, dto: UserEmailDto) {
    return this.prisma.user.update({
      where: {
        id
      },
      data: {
        email: dto.email
      }
    });
  }

  async remove(id: number) {
    return this.prisma.user.delete({
      where: {
        id
      }
    });
  }
}
