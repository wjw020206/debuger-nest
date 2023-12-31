import {
  Body,
  Controller,
  Delete,
  Get,
  Patch,
  Post,
  Query
} from '@nestjs/common';
import { UserService } from './user.service';
import { Auth } from 'src/auth/auth.decorator';
import { CurrentUser } from 'src/auth/current-user.decorator';
import { User } from '@prisma/client';
import { UserResponse } from './user.response';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserPasswordDto } from './dto/password.dto';
import { UserEmailDto } from './dto/email.dto';
import { UserTagDto } from './dto/tag.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('current')
  @Auth()
  info(@CurrentUser() user: User) {
    return new UserResponse(user).make();
  }

  @Get()
  findAll(
    @Query('page') page: number,
    @Query('search') search?: string,
    @Query('method') method?: 'letter' | 'latest'
  ) {
    return this.userService.findAll(+page, search, method);
  }

  @Patch('update')
  @Auth()
  async update(@Body() dto: UpdateUserDto, @CurrentUser() user: User) {
    await this.userService.update(user.id, dto);
  }

  @Patch('password')
  @Auth()
  async password(@Body() dto: UserPasswordDto, @CurrentUser() user: User) {
    await this.userService.updatePassword(user.id, dto);
  }

  @Patch('email')
  @Auth()
  async email(@Body() dto: UserEmailDto, @CurrentUser() user: User) {
    await this.userService.updateEmail(user.id, dto);
  }

  @Delete('delete')
  @Auth()
  async delete(@CurrentUser() user: User) {
    await this.userService.remove(user.id);
  }

  @Get('favorite-tags')
  @Auth()
  async favoriteTags(@CurrentUser() user: User) {
    return this.userService.favoriteTags(user.id);
  }

  @Post('add-favorite-tags')
  @Auth()
  async addFavoriteTags(@CurrentUser() user: User, @Body() dto: UserTagDto) {
    return this.userService.addFavoriteTags(user.id, +dto.tagId);
  }

  @Delete('remove-favorite-tags')
  @Auth()
  async removeFavoriteTags(@CurrentUser() user: User, @Body() dto: UserTagDto) {
    return this.userService.removeFavoriteTags(user.id, +dto.tagId);
  }
}
