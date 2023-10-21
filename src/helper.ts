import { BadRequestException } from '@nestjs/common';

export const validateFail = (message: string) => {
  throw new BadRequestException({
    error: 'Bad Request',
    message: [
      {
        message
      }
    ]
  });
};
