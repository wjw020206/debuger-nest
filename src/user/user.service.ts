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

  /** 获取用户列表(分页) */
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

  /** 修改用户信息 */
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

  /** 修改密码 */
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

  /** 修改邮箱 */
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

  /** 注销用户 */
  async remove(id: number) {
    return this.prisma.user.delete({
      where: {
        id
      }
    });
  }

  /** 获取关注的标签 */
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

  /** 添加关注的标签 */
  async addFavoriteTags(id: number, tagId: number) {
    await this.prisma.user.update({
      where: {
        id
      },
      data: {
        favoriteTags: {
          connect: {
            id: tagId
          }
        }
      }
    });
  }
}
