import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DatabaseModule } from './database.module';
import { UserModule } from './user.module';
import { EnzymeRepository } from '../database/repositories/enzyme.repository';
import { EnzymeController } from '@/presentation/controllers/enzyme.controller';
import { EnzymeService } from '@/aplication/use-cases/enzyme.service';


@Module({
  imports: [
    TypeOrmModule.forFeature([
      EnzymeRepository,
    ]),
    DatabaseModule,
    UserModule,
  ],
  controllers: [EnzymeController],
  providers: [EnzymeService],
  exports: [EnzymeService],
})
export class EnzymeModule {}
