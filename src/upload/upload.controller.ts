import {
  BadRequestException,
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { SupabaseService } from '@src/supabase/supabase.service';

interface MulterFile {
  fieldname: string;
  originalname: string;
  encoding: string;
  mimetype: string;
  buffer: Buffer;
  size: number;
}

@Controller('upload')
export class UploadController {
  constructor(private readonly supabase: SupabaseService) {}

  @Post('image')
  @UseInterceptors(FileInterceptor('file'))
  async uploadImage(@UploadedFile() file: MulterFile) {
    if (!file) {
      throw new BadRequestException('No file uploaded');
    }

    const filename = `public/${Date.now()}-${file.originalname}`;
    await this.supabase.uploadImage(
      'images',
      filename,
      file.buffer,
      file.mimetype,
    );

    return { url: this.supabase.getPublicUrl('images', filename) };
  }
}
