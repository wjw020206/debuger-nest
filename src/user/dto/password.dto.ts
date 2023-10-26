import { IsNotEmpty } from 'class-validator';

export class UserPasswordDto {
  @IsNotEmpty({ message: '密码不能为空' })
  password: string;
}
