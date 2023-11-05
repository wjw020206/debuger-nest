import user from './seed/user';
import tag from './seed/tag';
import question from './seed/question';

async function run() {
  // 创建标签
  await tag();

  // 创建用户及问题
  for (let i = 0; i < 30; i++) {
    const createdUser = await user();
    await question(createdUser);
  }
}

run();
