import { forwardRef, Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Env } from '../../shared/helpers/env.helper';
import { UserModule } from './user.module';
import { JwtAuthGuard } from '../security/guards/jwt-auth.guard';
import { RolesGuard } from '../security/guards/roles.guard';
import { JwtStrategy } from '../security/strategies/jwt.strategy';
import { UserRepository } from '../database/repositories/user.repository';
import { AuthController } from '../../presentation/controllers/auth.controller';
import { AuthService } from '../../aplication/use-cases/auth.service';
import { AuthSessionRepository } from '../database/repositories/auth-session.repository';
import { MailModule } from './mail.module';

@Module({
  imports: [
    forwardRef(() => UserModule),
    TypeOrmModule.forFeature([
      UserRepository,
      AuthSessionRepository,
    ]),
    PassportModule,
    JwtModule.register({
      secret: Env.getString('JWT_SECRET_KEY'),
      signOptions: { expiresIn: Env.getString('JWT_EXPIRATION_TIME') },
    }),
    forwardRef(() => UserModule),
    MailModule,
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    JwtStrategy,
    RolesGuard,
    JwtAuthGuard,
  ],
  exports: [AuthService, MailModule],
})
export class AuthModule {}
