import {
  UnsupportedMediaTypeException,
  UseInterceptors,
  applyDecorators
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';

export function Uploader(mime: string, field = 'file') {
  return applyDecorators(
    UseInterceptors(
      FileInterceptor(field, {
        // 文件大小限制为2MB
        limits: { fieldSize: Math.pow(1024, 2) * 2 },
        // 文件的类型
        fileFilter(
          req: Request,
          file: Express.Multer.File,
          callback: (error: Error | null, acceptFile: boolean) => void
        ) {
          if (!file.mimetype.includes(mime)) {
            callback(new UnsupportedMediaTypeException('文件类型错误'), false);
          } else {
            callback(null, true);
          }
        }
      })
    )
  );
}
