import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DatabaseModule } from './database.module';
import { UserModule } from './user.module';
import { ExperimentController } from '@/presentation/controllers/experiment.controller';
import { ExperimentService } from '@/aplication/use-cases/experiment.service';
import { ExperimentRepository } from '../database/repositories/experiment.repository';
import { ExperimentEnzymeService } from '@/aplication/use-cases/experiment-enzyme.service';
import { ExperimentEnzymeRepository } from '../database/repositories/experiment-enzyme.repository';
import { CalculateExperimentService } from '@/aplication/use-cases/calculate-experiment.service';
import { ResultExperimentService } from '@/aplication/use-cases/result-experiment.service';
import { ResultExperimentRepository } from '../database/repositories/result-experiment.repository';
import { EnzymeModule } from './enzyme.module';
import { ProcessModule } from './process.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      ExperimentRepository,
      ExperimentEnzymeRepository,
      ResultExperimentRepository,
    ]),
    DatabaseModule,
    UserModule,
    EnzymeModule,
    ProcessModule,
  ],
  controllers: [ExperimentController],
  providers: [ExperimentService, ExperimentEnzymeService, ResultExperimentService, CalculateExperimentService],
  exports: [ExperimentService, CalculateExperimentService],
})
export class ExperimentModule {}
