import { Injectable } from '@nestjs/common';
import { CreateQuestionDto } from './dto/create-question.dto';
import { UpdateQuestionDto } from './dto/update-question.dto';
import { PrismaService } from 'src/common/prisma.service';
import { User } from '@prisma/client';

@Injectable()
export class QuestionService {
  constructor(private prisma: PrismaService) {}

  create(dto: CreateQuestionDto, user: User) {
    return this.prisma.question.create({
      data: {
        ...dto,
        user: {
          connect: {
            id: user.id
          }
        }
      }
    });
  }

  async findAll(page = 1) {
    const pageCount = 10;
    const data = await this.prisma.question.findMany({
      skip: (page - 1) * pageCount,
      take: pageCount
    });

    return {
      meta: {
        page,
        pageCount,
        total: await this.prisma.question.count()
      },
      data
    };
  }

  async findOne(id: number) {
    return await this.prisma.question.findFirst({
      where: {
        id
      }
    });
  }

  async update(id: number, dto: UpdateQuestionDto) {
    return await this.prisma.question.update({
      data: {
        ...dto
      },
      where: {
        id
      }
    });
  }

  async remove(id: number) {
    return await this.prisma.question.delete({
      where: {
        id
      }
    });
  }
}
