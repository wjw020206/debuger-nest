import { Allow } from 'class-validator';

export class UpdateUserDto {
  @Allow()
  avatar: string;
}
