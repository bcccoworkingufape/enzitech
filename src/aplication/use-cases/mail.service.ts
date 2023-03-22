import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';
import { Env } from '@/shared/helpers/env.helper';

@Injectable()
export class MailService {
  constructor(private readonly mailerService: MailerService) {}

  async resetPasswordMail(email: string, name: string, token: string): Promise<void> {
    const url = `${Env.getString('MAIL_URL_REDIRECT')}/?token=${token}`;

    await this.mailerService.sendMail({
      to: email,
      from: 'enzitech.ufape.test@gmail.com',
      subject: 'Recuperação de senha enzitech',
      template: './recover-password',
      context: {
        name,
        url,
      },
    });
  }
}