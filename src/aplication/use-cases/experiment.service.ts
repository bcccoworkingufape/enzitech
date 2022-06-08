import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ExperimentRepository } from '@/infrastructure/database/repositories/experiment.repository';
import { CreateExperimentDto } from '@/presentation/dtos/experiment/create-experiment.dto';
import { User } from '@/domain/models/user.entity';
import { ExperimentEnzymeService } from './experiment-enzyme.service';
import { Experiment } from '@/domain/models/experiment.entity';
import { UserService } from './user.service';
import { ProcessService } from './process.service';


@Injectable()
export class ExperimentService {
  private readonly logger = new Logger(ExperimentService.name);

  constructor(
    @InjectRepository(ExperimentRepository)
    private readonly experimentRepository: ExperimentRepository,
    private readonly experimentEnzymeService: ExperimentEnzymeService,
    private readonly userService: UserService, 
    private readonly processService: ProcessService, 


  ) {}

  async create(data: CreateExperimentDto, userId: string): Promise<Experiment> {
    this.logger.debug('create');
    console.log(data.experimentsEnzymes);
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

      return experimentCreated;
    } catch (err) {
      console.log(err);
      throw new BadRequestException('Erro ao cadastrar experimento');
      
    }
  }

  // async list(filter: ListUserFilterDto): Promise<ListUserDto> {
  //   this.logger.debug('list');
  //   const { users, count } = await this.userRepository.list({
  //     email: filter.email,
  //     name: filter.name,
  //     role: filter.role,
  //     page: filter.page ?? 1,
  //     ordering: filter.ordering ?? 'ASC',
  //     orderBy: filter.orderBy,
  //     limit: filter.limit ?? 10,
  //     initialDate: filter.initialDate,
  //     finalDate: filter.finalDate,
  //   });
  //   return new ListUserDto({ users: users.map(u => new UserDto(u)), count });
  // }

  async delete(id: string): Promise<boolean> {
    this.logger.debug('delete');
    return !!(await this.experimentRepository.delete(id)).affected;
  }

}
