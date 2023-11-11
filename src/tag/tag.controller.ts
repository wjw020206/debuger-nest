import { Controller, Get, Param, Delete, Query } from '@nestjs/common';
import { TagService } from './tag.service';

@Controller('tag')
export class TagController {
  constructor(private readonly tagService: TagService) {}

  @Get()
  findAll(
    @Query('page') page: number,
    @Query('search') search?: string,
    @Query('method') method?: 'popular' | 'letter' | 'latest'
  ) {
    return this.tagService.findAll(+page, search, method);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.tagService.findOne(+id);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.tagService.remove(+id);
  }
}
