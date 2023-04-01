import { Module } from '@nestjs/common';
import { MailerModule } from '@nestjs-modules/mailer';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
import { resolve } from 'path';
import { MailService } from '../../aplication/use-cases/mail.service';
import { Env } from '../../shared/helpers/env.helper';

@Module({
  imports: [
    MailerModule.forRoot({
      transport: {
        ignoreTLS: true,
        secure: false,
        host: Env.getString('MAIL_HOST'),
        port: Env.getNumber('MAIL_PORT'),
        auth: {
          user: Env.getString('MAIL_USER'),
          pass: Env.getString('MAIL_PASS'),
        },
      },
      defaults: {
        from: '',
      },
      template: {
        dir: resolve(__dirname, '..', '..', 'mail', 'templates'),
        adapter: new HandlebarsAdapter(),
        options: {
          strict: true,
        },
      }
    }),
  ],
  providers: [MailService],
  exports: [MailService],
})
export class MailModule {}
