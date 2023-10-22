import { PrismaClient } from '@prisma/client';
import { Random } from 'mockjs';
import user from './seed/user';
import { hash } from 'argon2';

const prisma = new PrismaClient();

async function run() {
  for (let i = 0; i < 30; i++) {
    await prisma.user.create({
      data: {
        nickname: Random.cname(),
        password: await hash(Random.string()),
        email: Random.email(),
        Question: {
          create: {
            title: Random.ctitle(),
            content: Random.cparagraph()
          }
        }
      }
    });
  }

  await user();
}

run();
