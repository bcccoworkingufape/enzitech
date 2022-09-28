import { Injectable, Logger } from '@nestjs/common';
import { ResultExperimentEnzymeProcessCalculateDto } from '@/presentation/dtos/experiment/result-experiment-enzyme-process-calculation.dto';
import { ExperimentEnzymeDto } from '@/presentation/dtos/experiment/experiment-enzyme.dto';
import { EnzymeType } from '@/presentation/dtos/enzyme/enums/enzyme-type.enum';
import { CreateExperimentDataDto } from '@/presentation/dtos/experiment/create-experiment-data.dto';



@Injectable()
export class CalculateExperimentService {
  private readonly logger = new Logger(CalculateExperimentService.name);


  async calculate(enzyme: ExperimentEnzymeDto, data: CreateExperimentDataDto[]): Promise<ResultExperimentEnzymeProcessCalculateDto> {
    switch (enzyme.type) {
      case EnzymeType.FosfataseAcida:
        return this.calculateFosfataseAcida(enzyme, data);
    
      default:
        return {
          results: [],
          average: 0
        };
    }

  }

  calculateFosfataseAcida(enzyme: ExperimentEnzymeDto, data: CreateExperimentDataDto[]): ResultExperimentEnzymeProcessCalculateDto {
    const { duration, variableA, variableB, weightGround, weightSample, size } = enzyme;

    const results = data.map(repetition => {
      
      const diferrenceSample = repetition.sample - repetition.whiteSample;
      const slopeOfCurve = ((diferrenceSample - (-variableA)) / variableB) * 10;

      const result = (slopeOfCurve * size) / (duration * weightGround * weightSample);

      return parseFloat(result.toFixed(5));
      
    });
    const average = results.reduce((a, b) => a + b, 0) / results.length;
    return {
      results,
      average: parseFloat(average.toFixed(5))
    };
  }

}
