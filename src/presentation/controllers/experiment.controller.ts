import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  Post,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiBody,
  ApiParam,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { Request } from 'express';
import { Roles } from '../../shared/decorators/roles.decorator';
import { JwtAuthGuard } from '../../infrastructure/security/guards/jwt-auth.guard';
import { RolesGuard } from '../../infrastructure/security/guards/roles.guard';
import { CreateExperimentDto } from '../dtos/experiment/create-experiment.dto';
import { Experiment } from '@/domain/models/experiment.entity';
import { ExperimentService } from '@/aplication/use-cases/experiment.service';
import { SessionInfo } from '../dtos/auth-dto/interfaces/session-info.interface';
import { ListExperimentDto } from '../dtos/experiment/list-experiment.dto';
import { ListExperimentFilterDto } from '../dtos/experiment/list-experiment-filter.dto';
import { BaseExperimentDto } from '../dtos/experiment/base-experiment.dto';
import { ExperimentDto } from '../dtos/experiment/experiment.dto';
import { CalculateExperimentEnzymeDto } from '../dtos/experiment/calculate-experiment-calculation.dto';
import { ResultExperimentEnzymeProcessCalculateDto } from '../dtos/experiment/result-experiment-enzyme-process-calculation.dto';
import { SaveResultExperimentDto } from '../dtos/experiment/save-result-experiment.dto';
import { GetResultExperimentDto } from '../dtos/experiment/get-result-experiment.dto';
import { VerifyEnzymeDto } from '../dtos/experiment/verify-enzyme.dto';

@ApiTags('experiments')
@ApiBearerAuth()
@Controller('experiments')
export class ExperimentController {
  constructor(private experimentService: ExperimentService) {}

  @Post()
  @ApiBody({
    description: 'Experiment information to be inserted.',
    type: CreateExperimentDto,
  })
  @ApiResponse({
    type: Experiment,
    status: HttpStatus.CREATED,
  })
  @Roles('Admin', 'User')
  @UseGuards(JwtAuthGuard, RolesGuard)
  async create(
    @Body() body: any, 
    @Req() request: { request: Request; user: SessionInfo }
    ): Promise<BaseExperimentDto> {
    return this.experimentService.create(body, request.user.id);
  }
  
  @Post('calculate/:experiment')
  @ApiBody({
    description: 'User information to be inserted.',
    type: CalculateExperimentEnzymeDto,
  })
  @ApiResponse({
    type: ResultExperimentEnzymeProcessCalculateDto,
    status: HttpStatus.CREATED,
  })
  @Roles('Admin', 'User')
  @UseGuards(JwtAuthGuard, RolesGuard)
  async calculate(
    @Body() body: CalculateExperimentEnzymeDto,
    @Param('experiment') experimentId: string
    ): Promise<ResultExperimentEnzymeProcessCalculateDto> {
    return this.experimentService.calculate(body, experimentId);
  }

  @Post('save-result/:experiment')
  @ApiBody({
    description: 'Result to be inserted.',
    type: SaveResultExperimentDto,
  })
  @ApiResponse({
    status: HttpStatus.CREATED,
  })
  @Roles('Admin', 'User')
  @UseGuards(JwtAuthGuard, RolesGuard)
  async saveResult(
    @Body() body: SaveResultExperimentDto,
    @Param('experiment') experimentId: string
    ): Promise<any> {
    return this.experimentService.saveResult(body, experimentId);
  }

  @Get('get-result/:experiment')
  @ApiBody({
    description: 'Result experiment',
    type: GetResultExperimentDto,
  })
  @ApiResponse({
    status: HttpStatus.OK,
  })
  @Roles('Admin', 'User')
  @UseGuards(JwtAuthGuard, RolesGuard)
  async getResult(
    @Body() body: GetResultExperimentDto,
    @Param('experiment') experimentId: string
    ): Promise<any> {
    return this.experimentService.getResult(body, experimentId);
  }

  @Get('get-enzymes/:experiment')
  @ApiResponse({
    status: HttpStatus.OK,
  })
  @Roles('Admin', 'User')
  @UseGuards(JwtAuthGuard, RolesGuard)
  async verifyEnzymesResultSave(
    @Param('experiment') experimentId: string,
    @Body() body: VerifyEnzymeDto
    ): Promise<any> {
    return this.experimentService.verifyEnzymesResultSave(body, experimentId);
  }

  @Get()
  @ApiResponse({
    type: ListExperimentDto,
    status: HttpStatus.OK,
  })
  @Roles('Admin', 'User')
  @UseGuards(JwtAuthGuard, RolesGuard)
  async list(
    @Query() filter: ListExperimentFilterDto,
    @Req() request: { request: Request; user: SessionInfo }
    ): Promise<ListExperimentDto> {
    return this.experimentService.list(filter, request.user.id);
  }

  @Get(':id')
  @ApiResponse({
    type: ExperimentDto,
    status: HttpStatus.OK,
  })
  @Roles('Admin', 'User')
  @UseGuards(JwtAuthGuard, RolesGuard)
  async get(
    @Param('id') experimentId: string,
    @Req() request: { request: Request; user: SessionInfo }
    ): Promise<ExperimentDto> {
    return this.experimentService.get(experimentId, request.user.id);
  }

  @Delete(':id')
  @ApiParam({
    name: 'id',
    description: 'Id of experiment to be deleted!',
  })
  @ApiResponse({
    type: undefined,
    status: HttpStatus.OK,
  })
  @Roles('Admin', 'User')
  @UseGuards(JwtAuthGuard, RolesGuard)
  async delete(
    @Param('id') id: string,
  ): Promise<void> {
    await this.experimentService.delete(id);
  }
}
