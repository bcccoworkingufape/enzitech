import { Injectable, Logger } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { compare } from 'bcrypt';
import { AccessTokenAndUserDto } from '../../presentation/dtos/auth-dto/login-and-register-response.dto';
import { Env } from '../../shared/helpers/env.helper';
import { UserDto } from '../../presentation/dtos/user/user.dto';
import { UserRole } from '../../presentation/dtos/user/enums/user-role.enum';
import { User } from '../../domain/models/user.entity';
import { UserNotFoundException } from '../../domain/exceptions/user.exception';
import { UserService } from './user.service';
import { AuthSessionRepository } from '../../infrastructure/database/repositories/auth-session.repository';
import {
  InvalidCredentialsException,
  InvalidPasswordException,
} from '../../domain/exceptions/auth.exception';
import { ChangePasswordDto } from '../../presentation/dtos/auth-dto/change-password.dto';
import { UserRepository } from '@/infrastructure/database/repositories/user.repository';
import { ExternalUserToken } from '@/shared/interfaces/external-subscription/external-user-token.interface';

@Injectable()
export class AuthService {
  private readonly logger = new Logger(AuthService.name);

  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
    @InjectRepository(AuthSessionRepository)
    private readonly authSessionRepository: AuthSessionRepository,
    @InjectRepository(UserRepository)
    private readonly userRepository: UserRepository,
  ) {}

  async login(email: string, password: string): Promise<AccessTokenAndUserDto> {
    this.logger.debug('login');
    const user = await this.userRepository
      .createQueryBuilder('users')
      .where('users.email = :email', { email })
      .andWhere('users.role IN (:admin,:user)', { admin: UserRole.Admin, user: UserRole.User })
      .getOne();

    if (!user) {
      throw new UserNotFoundException();
    }

    if (!(await compare(password, user.passwordHash))) {
      throw new InvalidCredentialsException();
    }
    return this.createSession(user, {
      accessToken: '',
      expiresIn: 0,
      refreshToken: '',
    });
  }

  async sendRecoverPasswordEmail(email: string): Promise<void> {
    // this.logger.debug('sendRecoverPasswordEmail');
    // const user = await this.userService.findBy({ email });
    // const recoverToken = randomBytes(32).toString('hex');
    // const updatedUser = await this.userService.update(user.id, new UpdateUserDto({ recoverToken }));
    // try {
    //   await this.mailGateway.resetPasswordMail(
    //     email,
    //     updatedUser.name as string,
    //     updatedUser.recoverToken as string,
    //   );
    // } catch (e) {
    //   throw new BadGatewayException('Error trying send email');
    // }
  }

  private async createSession(
    user: User,
    externalSubscription: ExternalUserToken,
  ): Promise<AccessTokenAndUserDto> {
    this.logger.debug('createSession');
    const expiration = new Date();
    expiration.setMinutes(
      expiration.getMinutes() + Env.getNumber('AUTH_SESSION_EXPIRATION_MINUTES'),
    );

    const session = await this.authSessionRepository.create({
      expiresAt: expiration,
      data: {
        email: user.email,
        id: user.id,
        role: user.role,
        externalSubscription,
      },
    });

    const sessionEntity = await this.authSessionRepository.save(session);
    const userToAnswar = new UserDto({ ...user });
    return new AccessTokenAndUserDto({
      accessToken: this.jwtService.sign({ sessionId: sessionEntity.id }),
      user: { ...userToAnswar },
    });
  }

  async changePassword(id: string, changePasswordDto: ChangePasswordDto): Promise<void> {
    this.logger.debug('changePassword');
    const { password, passwordConfirm } = changePasswordDto;

    if (password !== passwordConfirm) {
      throw new InvalidPasswordException();
    }

    await this.userService.update(id, { password, recoverToken: null });
  }

  async resetPassword(recoverToken: string, changePasswordDto: ChangePasswordDto): Promise<void> {
    this.logger.debug('resetPassword');
    const user = await this.userService.findBy({ recoverToken });
    this.changePassword(user.id, changePasswordDto);
  }
}
