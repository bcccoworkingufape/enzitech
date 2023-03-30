import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ExperimentRepository } from '@/infrastructure/database/repositories/experiment.repository';
import { CreateExperimentDto } from '@/presentation/dtos/experiment/create-experiment.dto';
import { ExperimentEnzymeService } from './experiment-enzyme.service';
import { UserService } from './user.service';
import { ProcessService } from './process.service';
import { ListExperimentDto } from '@/presentation/dtos/experiment/list-experiment.dto';
import { BaseExperimentDto } from '@/presentation/dtos/experiment/base-experiment.dto';
import { ListExperimentFilterDto } from '@/presentation/dtos/experiment/list-experiment-filter.dto';
import { ExperimentDto } from '@/presentation/dtos/experiment/experiment.dto';
import { CalculateExperimentEnzymeDto } from '@/presentation/dtos/experiment/calculate-experiment-calculation.dto';
import { SaveResultExperimentDto } from '@/presentation/dtos/experiment/save-result-experiment.dto';
import { ResultExperimentEnzymeProcessCalculateDto } from '@/presentation/dtos/experiment/result-experiment-enzyme-process-calculation.dto';
import { CalculateExperimentService } from './calculate-experiment.service';
import { ResultExperimentService } from './result-experiment.service';
import { EnzymeService } from './enzyme.service';
import { VerifyEnzymeDto } from '@/presentation/dtos/experiment/verify-enzyme.dto';
import { EnzymeType } from '@/presentation/dtos/enzyme/enums/enzyme-type.enum';

@Injectable()
export class ExperimentService {
  private readonly logger = new Logger(ExperimentService.name);

  constructor(
    @InjectRepository(ExperimentRepository)
    private readonly experimentRepository: ExperimentRepository,
    private readonly experimentEnzymeService: ExperimentEnzymeService,
    private readonly userService: UserService, 
    private readonly processService: ProcessService, 
    private readonly enzymeService: EnzymeService,
    private readonly calculateExperimentService: CalculateExperimentService,
    private readonly resultExperimentService: ResultExperimentService,
  ) {}

  async create(data: CreateExperimentDto, userId: string): Promise<BaseExperimentDto> {
    this.logger.debug('create');

    try {
      const user = await this.userService.get(userId);
      const processes = await this.processService.findByIds(data.processes);
      const experiment = this.experimentRepository.create({
        name: data.name,
        description: data.description,
        repetitions: data.repetitions,
        user,
        processes
      });
      const experimentCreated = await this.experimentRepository.save(experiment);

      await this.experimentEnzymeService.bulkCreate(data.experimentsEnzymes, experimentCreated);
      
      return new BaseExperimentDto({...experimentCreated});
    } catch (err) {
      throw new BadRequestException(err.message ?? 'Erro ao cadastrar experimento');
    }
  }

  async list(filter: ListExperimentFilterDto, userId: string): Promise<ListExperimentDto> {
    this.logger.debug('list');

    const { experiments, count } = await this.experimentRepository.list({
      page: filter.page ?? 1,
      ordering: filter.ordering ?? 'ASC',
      orderBy: filter.orderBy,
      limit: filter.limit ?? 10,
      finished: filter.finished ?? false,
      userId
    });

    return new ListExperimentDto({ experiments: experiments.map(experiment => new BaseExperimentDto(experiment)), total: count });
  }

  async get(experimentId: string, userId: string): Promise<ExperimentDto> {
    this.logger.debug('get');

    try {
      const experiment: any = await this.experimentRepository.findOneOrFail({
        where: { 
          id: experimentId,
          user: { 
            id: userId
          }
        },
        relations: ['processes', 'experimentEnzymes']
      });

      return new ExperimentDto(experiment, experiment.experimentEnzymes, experiment.processes);
    } catch (error) {
      throw new BadRequestException(error.message ?? "Erro ao buscar experimento");
    }
  }

  async delete(id: string): Promise<boolean> {
    this.logger.debug('delete');

    return !!(await this.experimentRepository.delete(id)).affected;
  }

  async calculate(data: CalculateExperimentEnzymeDto, experimentId: string): Promise<ResultExperimentEnzymeProcessCalculateDto> {
    this.logger.debug('create');

    try {
      const experiment = await this.experimentRepository
        .findExperimentByIdAndEnzymeIdAndProcessId(experimentId, data.enzyme, data.process);
      const [enzyme] = experiment.enzymes;
      
      if (data.experimentData.length !== experiment.repetitions) {
        throw new Error("Número de repetições inválidas");
      }

      if (!enzyme) {
        throw new Error("Enzima não encontrada");
      }

      return this.calculateExperimentService.calculate(enzyme, data.experimentData);
    } catch (err) {
      throw new BadRequestException(err.message ?? 'Erro ao cadastrar experimento');
    }
  }

  async verifyEnzymes(data: VerifyEnzymeDto, experimentId: string): Promise<any> {
    this.logger.debug('get');

    try {
      const enzymes: any[] = [];
      
      const experiment = await this.experimentRepository.findOneOrFail(experimentId);
      const process = await this.processService.findById(data.process);
      const result = await this.experimentRepository.findExperimentByIdAndProcessId(experimentId, process.id);

      await Promise.all(result.experimentEnzymes.map(async (experimentEnzyme: any) => {
        const enzyme = await this.resultExperimentService.findResultExperiment(process, experimentEnzyme.enzyme.id, experiment);

        if (!enzyme) {
          enzymes.push({
            id: experimentEnzyme.enzyme.id,
            name: experimentEnzyme.enzyme.name,
            type: experimentEnzyme.enzyme.type,
            formula: experimentEnzyme.enzyme.formula,
            variableA: experimentEnzyme.variableA,
            variableB: experimentEnzyme.variableB,
            duration: experimentEnzyme.duration,
            weightSample: experimentEnzyme.weightSample,
            weightGround: experimentEnzyme.weightGround,
            size: experimentEnzyme.size,
          });
        }
      }));

      return { enzymes };
    } catch (err) {
      throw new BadRequestException(err.message ?? 'Erro na busca');
    }
  }

  async saveResult(data: SaveResultExperimentDto, experimentId: string): Promise<any> {
    this.logger.debug('create');

    try {
      const process = await this.processService.findById(data.process);
      const enzyme = await this.enzymeService.findById(data.enzyme);
      const experiment = await this.experimentRepository.findOneOrFail(experimentId);
      const experimentEnzyme = await this.experimentEnzymeService.find(experimentId, enzyme.id);

      await Promise.all(data.experimentData.map(async (experimentData) => {
        let result = 0;

        const differenceBetweenSamples = Number(experimentData.sample) - Number(experimentData.whiteSample);
        const curve = ((differenceBetweenSamples - Number(enzyme.variableB)) / Number(enzyme.variableA));

        if (
          enzyme.type === EnzymeType.Aryl || 
          enzyme.type === EnzymeType.Betaglucosidase ||
          enzyme.type === EnzymeType.FosfataseAcida ||
          enzyme.type === EnzymeType.FosfataseAlcalina
        ) {
          result = ((curve * Number(experimentEnzyme.size)) / (Number(experimentEnzyme.duration) * Number(experimentEnzyme.weightGround) * Number(experimentEnzyme.weightSample)));
        } else if (enzyme.type === EnzymeType.Urease) {
          result = (curve * Number(experimentEnzyme.size) * 10) / (Number(experimentEnzyme.weightGround) * Number(experimentEnzyme.weightSample));
        } else if (enzyme.type === EnzymeType.FDA) {
          const fdaSample = (Number(experimentData.sample) - 0.1494) / 0.3708;
          const fdaWhiteSample = (Number(experimentData.whiteSample) - 0.1494) / 0.3708;
          const fdaDrySoilSample = (fdaSample * 20.2) / 2.369;
          const fdaDrySoilWhiteSample = (fdaWhiteSample * 20) / 2.369;
          result = fdaDrySoilSample - fdaDrySoilWhiteSample;
        }
        
        const resultFormatted = parseFloat(result.toFixed(5));

        await this.resultExperimentService.create({
          experiment,
          process, 
          enzyme,
          result: resultFormatted,
          curve,
          differenceBetweenSamples,
          sample: experimentData.sample,
          whiteSample: experimentData.whiteSample
        });
      }));

      const getExperiment = await this.experimentRepository.findExperimentById(experimentId);
      const totalEnzymesCalculateResultSave = await this.resultExperimentService.countResultExperiment(experiment);
      const totalEnzymeExperiment = getExperiment.experimentEnzymes.length;
      const totalProcessesExperiment = getExperiment.processes.length;
      const progress = ((totalEnzymesCalculateResultSave / (totalEnzymeExperiment * totalProcessesExperiment * getExperiment.repetitions)));

      experiment.progress = Number(progress.toFixed(2));

      if (progress === 1) {
        experiment.finishedAt = new Date();
      }

      await this.experimentRepository.save(experiment);

      const experimentUpdated = await this.experimentRepository.findExperimentById(experimentId);

      return new ExperimentDto(experimentUpdated, experimentUpdated.experimentEnzymes, experimentUpdated.processes);
    } catch (err) {
      throw new BadRequestException(err.message ?? 'Erro ao salvar o resultado do experimento');
    }
  }

  async getTotalResultSave(experimentId: string): Promise<any> {
    this.logger.debug('get');
    
    try {
      const experiment = await this.experimentRepository.findOneOrFail(experimentId);
      const listResultsExperiment = await this.resultExperimentService.listResultsExperiment(experiment);

      const results: any[] = [];

      if (listResultsExperiment?.length) {
        await Promise.all(listResultsExperiment.map(
          async (resultExperiment) => {
            const experimentEnzyme = await this.experimentEnzymeService.find(experimentId, resultExperiment.enzyme.id);

            /**
             * manipular tratamento x enzymas
             */
            
            return results.push({
              id: resultExperiment.id,
              enzymeName: resultExperiment.enzyme.name,
              processName: resultExperiment.process.name,
              params: {
                sample: resultExperiment.sample,
                whiteSample: resultExperiment.whiteSample,
                differenceBetweenSamples: resultExperiment.differenceBetweenSamples,
                variableB: resultExperiment.enzyme.variableB,
                variableA: resultExperiment.enzyme.variableA,
                curve: resultExperiment.curve,
                weightGround: experimentEnzyme.weightGround,
                duration: experimentEnzyme.duration,
                size: experimentEnzyme.size,
                weightSample: experimentEnzyme.weightSample
              }
            });
          }
        ));
      }

      return { results };
    } catch (err) {
      throw new BadRequestException(err.message ?? 'Erro ao buscar o resultado do experimento');
    }
  }
}
