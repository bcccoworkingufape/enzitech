import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EnzymeRepository } from '@/infrastructure/database/repositories/enzyme.repository';
import { CreateEnzymeDto } from '@/presentation/dtos/enzyme/create-enzyme.dto';
import { Enzyme } from '@/domain/models/enzyme.entity';
import { EnzymeType } from '@/presentation/dtos/enzyme/enums/enzyme-type.enum';

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
      const formula = await this.getFormulaEnzyme(data.type);

      const process = this.enzymeRepository.create({ ...data, formula });

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

  async getFormulaEnzyme(enzymeType: string): Promise<any> {
    switch (enzymeType) {
      case EnzymeType.FosfataseAcida:
        return 'µg PNP g-1 solo h-1';
      case EnzymeType.FosfataseAlcalina:
        return 'µg PNP g-1 solo h-1';
      case EnzymeType.Betaglucosidade:
        return 'μg PNG g-1 de solo h-1';
      case EnzymeType.Aryl:
        return 'µg PNS g-1 solo h-1';
      case EnzymeType.Urease:
        return 'μg NH4-N g-1 dwt 2h-1';
      case EnzymeType.FDA:
        return 'µg g-1 solo.seco h-1';
      default:
        return null;
    }
  }
}
