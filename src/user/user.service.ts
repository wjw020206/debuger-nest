import { Injectable } from '@nestjs/common';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from 'src/common/prisma.service';
import { UserPasswordDto } from './dto/password.dto';
import { hash } from 'argon2';
import { UserEmailDto } from './dto/email.dto';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async findAll(page = 1) {
    const pageCount = 36;
    const data = await this.prisma.tag.findMany({
      skip: (page - 1) * pageCount,
      take: pageCount
    });

    return {
      meta: {
        page,
        pageCount,
        total: await this.prisma.tag.count()
      },
      data
    };
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
