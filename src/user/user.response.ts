import { User } from '@prisma/client';
import { JsonResponse } from 'src/core/json.response';

export class UserResponse extends JsonResponse<User> {
  protected hidden: (keyof User)[] = ['password'];
  public make(): User {
    super.make();
    // 设置头像默认值
    this.data.avatar = this.data.avatar || '/public/assets/default_avatar.jpg';
    return this.data;
  }
}
