import { PartialType } from '@nestjs/mapped-types';
import { RegisterDto } from './register.dto';
import { IsNotEmpty } from 'class-validator';
import { IsExists } from 'src/validate/is-exists';

export class LoginDto extends PartialType(RegisterDto) {
  @IsNotEmpty({ message: '邮箱不能为空' })
  @IsExists('user', ['email'], { message: '用户不存在' })
  email: string;

  @IsNotEmpty({ message: '密码不能为空' })
  password: string;
}
