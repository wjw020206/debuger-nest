import { IsNotEmpty, Matches } from 'class-validator';
import { emailRegExp, passwordRegExp } from 'src/utils/validators';
import { IsNotExists } from 'src/validate/is-not-exists';

export class RegisterDto {
  @IsNotEmpty({ message: '昵称不能为空' })
  @IsNotExists('user', ['name'], { message: '昵称已经被占用' })
  name: string;

  @IsNotEmpty({ message: '密码不能为空' })
  @Matches(passwordRegExp, { message: '密码格式不正确' })
  password: string;

  @IsNotEmpty({ message: '邮箱不能为空' })
  @Matches(emailRegExp, { message: '邮箱格式不正确' })
  @IsNotExists('user', ['email'], { message: '邮箱已经被注册' })
  email: string;
}
