import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/common/prisma.service';

@Injectable()
export class TagService {
  constructor(private prisma: PrismaService) {}

  async findAll(
    page = 1,
    search?: string,
    method?: 'popular' | 'letter' | 'latest'
  ) {
    const pageCount = 36;

    let data = null;
    let count = 0;

    if (search) {
      if (method === 'latest') {
        data = await this.prisma.tag.findMany({
          skip: (page - 1) * pageCount,
          take: pageCount,
          where: {
            title: {
              contains: search
            }
          },
          orderBy: {
            createAt: 'desc'
          },
          include: {
            questions: {
              select: {
                id: true
              }
            }
          }
        });
      } else if (method === 'letter') {
        data = await this.prisma.tag.findMany({
          skip: (page - 1) * pageCount,
          take: pageCount,
          where: {
            title: {
              contains: search
            }
          },
          orderBy: {
            title: 'asc'
          },
          include: {
            questions: {
              select: {
                id: true
              }
            }
          }
        });
      } else {
        data = await this.prisma.tag.findMany({
          skip: (page - 1) * pageCount,
          take: pageCount,
          where: {
            title: {
              contains: search
            }
          },
          include: {
            questions: {
              select: {
                id: true
              }
            }
          }
        });
      }

      count = await this.prisma.tag.count({
        where: {
          title: {
            contains: search
          }
        }
      });
    } else {
      if (method === 'latest') {
        data = await this.prisma.tag.findMany({
          skip: (page - 1) * pageCount,
          take: pageCount,
          where: {
            title: {
              contains: search
            }
          },
          orderBy: {
            createAt: 'desc'
          },
          include: {
            questions: {
              select: {
                id: true
              }
            }
          }
        });
      } else if (method === 'letter') {
        data = await this.prisma.tag.findMany({
          skip: (page - 1) * pageCount,
          take: pageCount,
          where: {
            title: {
              contains: search
            }
          },
          orderBy: {
            title: 'asc'
          },
          include: {
            questions: {
              select: {
                id: true
              }
            }
          }
        });
      } else {
        data = await this.prisma.tag.findMany({
          skip: (page - 1) * pageCount,
          take: pageCount,
          include: {
            questions: {
              select: {
                id: true
              }
            }
          },
          orderBy: {
            // 使用 count 聚合函数来按问题数量降序排序
            questions: {
              _count: 'desc'
            }
          }
        });
      }

      count = await this.prisma.tag.count();
    }

    return {
      meta: {
        page,
        pageCount,
        total: count
      },
      data
    };
  }
}
