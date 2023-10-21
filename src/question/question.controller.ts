import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query
} from '@nestjs/common';
import { QuestionService } from './question.service';
import { CreateQuestionDto } from './dto/create-question.dto';
import { UpdateQuestionDto } from './dto/update-question.dto';
import { Auth } from 'src/auth/auth.decorator';
import { CurrentUser } from 'src/auth/current-user.decorator';
import { User } from '@prisma/client';

@Controller('question')
export class QuestionController {
  constructor(private readonly questionService: QuestionService) {}

  @Post('create')
  @Auth()
  create(
    @Body() createQuestionDto: CreateQuestionDto,
    @CurrentUser() user: User
  ) {
    return this.questionService.create(createQuestionDto, user);
  }

  @Get()
  findAll(@Query('page') page: number) {
    return this.questionService.findAll(+page);
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.questionService.findOne(+id);
  }

  @Patch(':id')
  @Auth()
  update(
    @Param('id') id: number,
    @Body() updateQuestionDto: UpdateQuestionDto
  ) {
    return this.questionService.update(+id, updateQuestionDto);
  }

  @Delete(':id')
  @Auth()
  remove(@Param('id') id: string) {
    return this.questionService.remove(+id);
  }
}
