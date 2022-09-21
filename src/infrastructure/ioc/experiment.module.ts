import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DatabaseModule } from './database.module';
import { UserModule } from './user.module';
import { ExperimentController } from '@/presentation/controllers/experiment.controller';
import { ExperimentService } from '@/aplication/use-cases/experiment.service';
import { ExperimentRepository } from '../database/repositories/experiment.repository';
import { ExperimentEnzymeService } from '@/aplication/use-cases/experiment-enzyme.service';
import { ExperimentEnzymeRepository } from '../database/repositories/experiment-enzyme.repository';
import { EnzymeModule } from './enzyme.module';
import { ProcessModule } from './process.module';


@Module({
  imports: [
    TypeOrmModule.forFeature([
      ExperimentRepository,
      ExperimentEnzymeRepository,
    ]),
    DatabaseModule,
    UserModule,
    EnzymeModule,
    ProcessModule,
  ],
  controllers: [ExperimentController],
  providers: [ExperimentService, ExperimentEnzymeService],
  exports: [ExperimentService],
})
export class ExperimentModule {}
