import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { User } from '@prisma/client';
import { PrismaService } from 'src/common/prisma.service';
import { ConfigService } from 'src/common/config.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(
    configService: ConfigService,
    private prisma: PrismaService
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: configService.get('app_key')
    });
  }

  async validate({ id }: { id: number }): Promise<User> {
    const user = await this.prisma.user.findUnique({
      where: { id }
    });

    if (!user) {
      throw new UnauthorizedException('用户未登录');
    }

    return user;
  }
}
