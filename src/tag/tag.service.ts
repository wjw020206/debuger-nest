import { Injectable } from '@nestjs/common';
import { CreateTagDto } from './dto/create-tag.dto';
import { UpdateTagDto } from './dto/update-tag.dto';
import { PrismaService } from 'src/common/prisma.service';

@Injectable()
export class TagService {
  constructor(private prisma: PrismaService) {}

  create(createTagDto: CreateTagDto) {
    return 'This action adds a new tag';
  }

  async findAll(
    page = 1,
    search?: string,
    method: 'popular' | 'letter' | 'latest' = 'popular'
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
          }
        });
      } else {
        data = await this.prisma.tag.findMany({
          skip: (page - 1) * pageCount,
          take: pageCount
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

  findOne(id: number) {
    return `This action returns a #${id} tag`;
  }

  update(id: number, updateTagDto: UpdateTagDto) {
    return `This action updates a #${id} tag`;
  }

  remove(id: number) {
    return `This action removes a #${id} tag`;
  }
}
