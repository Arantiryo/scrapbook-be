import { Injectable } from '@nestjs/common';
import { type SupabaseClient, createClient } from '@supabase/supabase-js';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class StorageService {
  private supabase: SupabaseClient;

  constructor(private readonly configService: ConfigService) {
    this.supabase = createClient<any, 'public', 'public'>(
      this.configService.get<string>('SUPABASE_URL')!,
      this.configService.get<string>('SUPABASE_SERVICE_KEY')!,
    );
  }

  async uploadImage(
    bucket: string,
    path: string,
    file: Buffer,
    mimetype: string,
  ) {
    const { data, error } = await this.supabase.storage
      .from(bucket)
      .upload(path, file, { contentType: mimetype });

    if (error || !data) throw error;

    return { url: data.fullPath };
  }

  getPublicUrl(bucket: string, path: string) {
    return this.supabase.storage.from(bucket).getPublicUrl(path).data.publicUrl;
  }
}
