import { IsNotEmpty, Matches } from 'class-validator';
import { emailRegExp } from 'src/utils/validators';
import { IsNotExists } from 'src/validate/is-not-exists';

export class UserEmailDto {
  @IsNotEmpty({ message: '邮箱不能为空' })
  @Matches(emailRegExp, { message: '邮箱格式不正确' })
  @IsNotExists('user', ['email'], { message: '邮箱已经被绑定' })
  email: string;
}
