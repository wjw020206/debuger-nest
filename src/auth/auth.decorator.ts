import { UseGuards, applyDecorators } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

// 验证是否登录的装饰器
export function Auth() {
  return applyDecorators(UseGuards(AuthGuard('jwt')));
}
