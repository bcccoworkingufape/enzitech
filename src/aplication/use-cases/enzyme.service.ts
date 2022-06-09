import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EnzymeRepository } from '@/infrastructure/database/repositories/enzyme.repository';
import { CreateEnzymeDto } from '@/presentation/dtos/enzyme/create-enzyme.dto';
import { Enzyme } from '@/domain/models/enzyme.entity';


@Injectable()
export class EnzymeService {
  private readonly logger = new Logger(EnzymeService.name);

  constructor(
    @InjectRepository(EnzymeRepository)
    private readonly enzymeRepository: EnzymeRepository,
  ) {}

  async create(data: CreateEnzymeDto): Promise<Enzyme> {
    this.logger.debug('create');
    try {
      const process = this.enzymeRepository.create({...data});

      return this.enzymeRepository.save(process);
    } catch (err) {
      throw new BadRequestException('Erro ao cadastrar enzima');
      
    }
  }

  async findById(id: string): Promise<Enzyme> {
    this.logger.debug('findById');
    const enzyme = await this.enzymeRepository.findOne({ where: { id } });
    
    if(!enzyme){
      throw new BadRequestException('Enzyme not found');
    }
    return enzyme;
  }

  async list(): Promise<Enzyme[]> {
    this.logger.debug('list');
    return this.enzymeRepository.find();
  }

  async delete(id: string): Promise<boolean> {
    this.logger.debug('delete');
    return !!(await this.enzymeRepository.delete(id)).affected;
  }

}
