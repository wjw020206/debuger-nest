import { UseGuards, applyDecorators } from '@nestjs/common';
import { AdminGuard } from './admin.guard';
import { AuthGuard } from '@nestjs/passport';

// 验证是否稍是管理员的装饰器
export function Admin() {
  return applyDecorators(UseGuards(AuthGuard('jwt'), AdminGuard));
}
