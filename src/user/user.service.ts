import { Injectable } from '@nestjs/common';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from 'src/common/prisma.service';
import { UserPasswordDto } from './dto/password.dto';
import { hash } from 'argon2';
import { UserEmailDto } from './dto/email.dto';
import { UserResponse } from './user.response';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async findAll(page = 1, search?: string, method?: 'letter' | 'latest') {
    const pageCount = 36;

    let data = null;
    let count = 0;

    if (search) {
      if (method === 'latest') {
        data = await this.prisma.user.findMany({
          skip: (page - 1) * pageCount,
          take: pageCount,
          where: {
            nickname: {
              contains: search
            }
          },
          orderBy: {
            createAt: 'desc'
          }
        });
      } else if (method === 'letter') {
        data = await this.prisma.user.findMany({
          skip: (page - 1) * pageCount,
          take: pageCount,
          where: {
            nickname: {
              contains: search
            }
          },
          orderBy: {
            nickname: 'asc'
          }
        });
      }

      count = await this.prisma.user.count({
        where: {
          nickname: {
            contains: search
          }
        }
      });
    } else {
      if (method === 'latest') {
        data = await this.prisma.user.findMany({
          skip: (page - 1) * pageCount,
          take: pageCount,
          orderBy: {
            createAt: 'desc'
          }
        });
      } else if (method === 'letter') {
        data = await this.prisma.user.findMany({
          skip: (page - 1) * pageCount,
          take: pageCount,
          orderBy: {
            nickname: 'asc'
          }
        });
      }
      count = await this.prisma.user.count();
    }

    return {
      meta: {
        page,
        pageCount,
        total: count
      },
      data: data?.map(item => {
        return new UserResponse(item).make();
      })
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

  async favoriteTags(id: number) {
    return this.prisma.user.findUnique({
      where: {
        id
      },
      select: {
        favoriteTags: true
      }
    });
  }
}
