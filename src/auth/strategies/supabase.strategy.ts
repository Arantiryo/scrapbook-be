import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

@Injectable()
export class SupabaseStrategy extends PassportStrategy(Strategy) {
  public constructor(configService: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.get<string>('SUPABASE_JWT_SECRET')!,
    });
  }

  // eslint-disable-next-line @typescript-eslint/require-await
  async validate(payload: any): Promise<any> {
    return payload;
  }

  authenticate(req: any) {
    super.authenticate(req);
  }
}
