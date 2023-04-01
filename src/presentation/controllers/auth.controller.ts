import { Body, Controller, HttpStatus, Param, Post } from '@nestjs/common';
import { ApiBody, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AccessTokenAndUserDto } from '../dtos/auth-dto/login-and-register-response.dto';
import { AuthService } from '../../aplication/use-cases/auth.service';
import { LoginDto } from '../dtos/auth-dto/login.dto';
import { SendEmailRecoverPasswordDto } from '../dtos/auth-dto/send-email-recover-password.dto';
import { ChangePasswordDto } from '../dtos/auth-dto/change-password.dto';

@ApiTags('Authentication')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiBody({
    description: 'Payload containing the credentials for login.',
    type: LoginDto,
  })
  @ApiResponse({
    description: 'The access token that should be used to access restricted resources.',
    type: AccessTokenAndUserDto,
    status: HttpStatus.OK,
  })
  @Post('login')
  async login(@Body() body: LoginDto): Promise<AccessTokenAndUserDto> {
    return this.authService.login(body.email, body.password);
  }

  @ApiBody({
    description: 'Payload containing the user email.',
    type: SendEmailRecoverPasswordDto,
  })
  @ApiResponse({
    description: 'Recovery password email has been sent.',
    status: HttpStatus.OK,
  })
  @Post('send-recover-email')
  async sendRecoverPasswordEmail(@Body() body: SendEmailRecoverPasswordDto): Promise<void> {
    return this.authService.sendRecoverPasswordEmail(body.email);
  }

  @ApiBody({
    description: 'Payload containing the user password and confirm password.',
    type: ChangePasswordDto,
  })
  @ApiResponse({
    description: 'Password reset successful.',
    status: HttpStatus.OK,
  })
  @Post('reset-password/:token')
  async resetPassword(
    @Param('token') token: string,
    @Body() body: ChangePasswordDto,
  ): Promise<void> {
    return this.authService.resetPassword(token, body);
  }
}
