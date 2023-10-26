import { Body, Controller, Delete, Get, Patch } from '@nestjs/common';
import { UserService } from './user.service';
import { Auth } from 'src/auth/auth.decorator';
import { CurrentUser } from 'src/auth/current-user.decorator';
import { User } from '@prisma/client';
import { UserResponse } from './user.response';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserPasswordDto } from './dto/password.dto';
import { UserEmailDto } from './dto/email.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('current')
  @Auth()
  info(@CurrentUser() user: User) {
    return new UserResponse(user).make();
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
}
