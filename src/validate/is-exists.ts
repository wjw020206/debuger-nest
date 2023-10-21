import { PrismaClient } from '@prisma/client';
import { ValidationOptions, registerDecorator } from 'class-validator';

export function IsExists(
  table: string,
  fields: string[],
  validationOptions?: ValidationOptions
) {
  return function (object: Record<string, any>, propertyName: string) {
    registerDecorator({
      name: 'IsExists',
      target: object.constructor,
      propertyName: propertyName,
      constraints: [table],
      options: validationOptions,
      validator: {
        async validate(value: string) {
          const prisma = new PrismaClient({ log: ['query'] });
          const res = await (prisma[table as any] as any).findFirst({
            where: {
              OR: fields.map(filed => ({ [filed]: value }))
            }
          });
          return Boolean(res);
        }
      }
    });
  };
}
