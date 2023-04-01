import { Module } from '@nestjs/common';
import { ScheduleModule } from '@nestjs/schedule';
import { UserModule } from '../infrastructure/ioc/user.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from '../infrastructure/ioc/database.module';
import { ProcessModule } from '@/infrastructure/ioc/process.module';
import { EnzymeModule } from '@/infrastructure/ioc/enzyme.module';
import { ExperimentModule } from '@/infrastructure/ioc/experiment.module';
import { MailModule } from '@/infrastructure/ioc/mail.module';

@Module({
  imports: [
    ScheduleModule.forRoot(),
    UserModule,
    DatabaseModule,
    ProcessModule,
    EnzymeModule,
    ExperimentModule,
    MailModule
  ],
  controllers: [AppController],
  providers: [AppService],
  exports: [AppService],
})
export class AppModule {}
