import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { ExperimentEnzyme } from '@/domain/models/experiment-enzyme.entity';
import { ProcessDto } from '../process/process.dto';
import { BaseExperimentDto } from './base-experiment.dto';
import { ExperimentEnzymeDto } from './experiment-enzyme.dto';
import { Process } from '@/domain/models/process.entity';

export class ExperimentDto extends BaseExperimentDto {
  @ApiProperty({
    type: [ProcessDto],
    description: 'processes',
    required: true,
  })
  @Expose()
  readonly processes: ProcessDto[];

  @ApiProperty({
    type: [ExperimentEnzymeDto],
    description: 'enzymes',
    required: true,
  })
  @Expose()
  readonly enzymes: ExperimentEnzymeDto[];

  constructor(obj: any, experimentEnzymes: ExperimentEnzyme[], processes: Process[]) {
    super(obj);
    this.enzymes = experimentEnzymes.map(experimentEnzyme => new ExperimentEnzymeDto({
      ...experimentEnzyme,
      id: experimentEnzyme.enzyme.id,
      name: experimentEnzyme.enzyme.name,
      type: experimentEnzyme.enzyme.type,
      formula: experimentEnzyme.enzyme.formula,
    }));
    this.processes = processes.map(process => new ProcessDto({...process}));
  }
}
