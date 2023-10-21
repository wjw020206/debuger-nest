import { registerAs } from '@nestjs/config';

export interface Config {
  [key: string]: string;
  app_key: string;
}

export default registerAs('config', () => {
  return {
    app_key: 'CodePencil'
  } as Config;
});
