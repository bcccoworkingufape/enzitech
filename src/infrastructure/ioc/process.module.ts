import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DatabaseModule } from './database.module';
import { ProcessRepository } from '../database/repositories/process.repository';
import { ProcessController } from '@/presentation/controllers/process.controler';
import { ProcessService } from '@/aplication/use-cases/process.service';
import { UserService } from '@/aplication/use-cases/user.service';
import { UserModule } from './user.module';


@Module({
  imports: [
    TypeOrmModule.forFeature([
      ProcessRepository,
    ]),
    DatabaseModule,
    UserModule,
  ],
  controllers: [ProcessController],
  providers: [ProcessService],
  exports: [ProcessService],
})
export class ProcessModule {}
