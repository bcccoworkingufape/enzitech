import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthSessionRepository } from '../../../infrastructure/database/repositories/auth-session.repository';
import { Env } from '../../../shared/helpers/env.helper';
import { SessionInfo } from '../../../presentation/dtos/auth-dto/interfaces/session-info.interface';
import { InvalidSessionException } from '../../../domain/exceptions/auth.exception';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    @InjectRepository(AuthSessionRepository)
    private readonly authSessionRepository: AuthSessionRepository,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: Env.getString('JWT_SECRET_KEY'),
    });
  }

  async validate(payload: { sessionId: string }): Promise<SessionInfo> {
    const session = await this.authSessionRepository.findOne({ id: payload.sessionId });

    if (!session || session.expiresAt <= new Date()) {
      throw new InvalidSessionException();
    }

    return session.data;
  }
}
