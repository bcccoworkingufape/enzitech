import { Injectable, Logger } from '@nestjs/common';
import { ResultExperimentEnzymeProcessCalculateDto } from '@/presentation/dtos/experiment/result-experiment-enzyme-process-calculation.dto';
import { ExperimentEnzymeDto } from '@/presentation/dtos/experiment/experiment-enzyme.dto';
import { CreateExperimentDataDto } from '@/presentation/dtos/experiment/create-experiment-data.dto';
import { EnzymeType } from '@/presentation/dtos/enzyme/enums/enzyme-type.enum';

@Injectable()
export class CalculateExperimentService {
  private readonly logger = new Logger(CalculateExperimentService.name);

  async calculate(enzyme: ExperimentEnzymeDto, data: CreateExperimentDataDto[]): Promise<ResultExperimentEnzymeProcessCalculateDto> {
    switch (enzyme.type) {
      case EnzymeType.FosfataseAcida:
        return this.calculateFosfataseAcida(enzyme, data);
      case EnzymeType.FosfataseAlcalina:
        return this.calculateFosfataseAlcalina(enzyme, data);
      case EnzymeType.Betaglucosidade:
        return this.calculateBetaglucosidade(enzyme, data);
      case EnzymeType.Aryl:
        return this.calculateAryl(enzyme, data);
      case EnzymeType.Urease:
        return this.calculateUrease(enzyme, data);
      case EnzymeType.FDA:
        return this.calculateFDA(enzyme, data);

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

      const slopeOfCurve = ((diferrenceSample - variableB) / variableA) * 10;

      const result = (slopeOfCurve * size) / (duration * weightGround * weightSample);

      return parseFloat(result.toFixed(5));
    });

    const average = parseFloat((results.reduce((a, b) => a + b, 0) / results.length).toFixed(5));
    
    return { results, average };
  }

  calculateFosfataseAlcalina(enzyme: ExperimentEnzymeDto, data: CreateExperimentDataDto[]): ResultExperimentEnzymeProcessCalculateDto {
    const { duration, variableA, variableB, weightGround, weightSample, size } = enzyme;

    const results = data.map(repetition => {
      const diferrenceSample = repetition.sample - repetition.whiteSample;

      const slopeOfCurve = ((diferrenceSample - variableB) / variableA) * 10;

      const result = (slopeOfCurve * size) / (duration * weightGround * weightSample);

      return parseFloat(result.toFixed(5));
    });

    const average = parseFloat((results.reduce((a, b) => a + b, 0) / results.length).toFixed(5));
    
    return { results, average };
  }

  calculateBetaglucosidade(enzyme: ExperimentEnzymeDto, data: CreateExperimentDataDto[]): ResultExperimentEnzymeProcessCalculateDto {
    const { duration, variableA, variableB, weightGround, weightSample, size } = enzyme;

    const results = data.map(repetition => {
      const diferrenceSample = repetition.sample - repetition.whiteSample;

      const slopeOfCurve = ((diferrenceSample - variableB) / variableA) * 10;

      const result = (slopeOfCurve * size) / (duration * weightGround * weightSample);

      return parseFloat(result.toFixed(5));
    });

    const average = parseFloat((results.reduce((a, b) => a + b, 0) / results.length).toFixed(5));
    
    return { results, average };
  }

  calculateAryl(enzyme: ExperimentEnzymeDto, data: CreateExperimentDataDto[]): ResultExperimentEnzymeProcessCalculateDto {
    const { duration, variableA, variableB, weightGround, weightSample, size } = enzyme;

    const results = data.map(repetition => {
      const diferrenceSample = repetition.sample - repetition.whiteSample;

      const slopeOfCurve = ((diferrenceSample - variableB) / variableA) * 10;

      const result = (slopeOfCurve * size) / (duration * weightGround * weightSample);

      return parseFloat(result.toFixed(5));
    });

    const average = parseFloat((results.reduce((a, b) => a + b, 0) / results.length).toFixed(5));
    
    return { results, average };
  }

  calculateUrease(enzyme: ExperimentEnzymeDto, data: CreateExperimentDataDto[]): any {
    const { variableA, variableB, weightGround, weightSample, size } = enzyme;

    const results = data.map(repetition => {
      const diferrenceSample = repetition.sample - repetition.whiteSample;

      const slopeOfCurve = ((diferrenceSample - variableB) / variableA);

      const result = (slopeOfCurve * size * 10) / (weightGround * weightSample);

      return parseFloat(result.toFixed(5));
    });

    const average = parseFloat((results.reduce((a, b) => a + b, 0) / results.length).toFixed(5));
    
    return { results, average };
  }

  calculateFDA(enzyme: ExperimentEnzymeDto, data: CreateExperimentDataDto[]): any {
    const { variableA, variableB, weightGround, weightSample, size } = enzyme;

    const results = data.map(repetition => {
      const fdaSample = (repetition.sample - 0.1494) / 0.3708;
      const fdaWhiteSample = (repetition.whiteSample - 0.1494) / 0.3708;

      const fdaDrySoilSample = (fdaSample * 20.2) / 2.369;
      const fdaDrySoilWhiteSample = (fdaWhiteSample * 20) / 2.369;

      const result = fdaDrySoilSample - fdaDrySoilWhiteSample;

      return parseFloat(result.toFixed(5));
    });

    const average = parseFloat((results.reduce((a, b) => a + b, 0) / results.length).toFixed(5));

    return { results, average };
  }
}
