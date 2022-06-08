import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Post,
  Put,
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
import { Roles } from '../../shared/decorators/roles.decorator';
import { JwtAuthGuard } from '../../infrastructure/security/guards/jwt-auth.guard';
import { RolesGuard } from '../../infrastructure/security/guards/roles.guard';
import { UserDto } from '../dtos/user/user.dto';
import { ProcessService } from '@/aplication/use-cases/process.service';
import { CreateProcessDto } from '../dtos/process/create-process.dto';
import { Process } from '@/domain/models/process.entity';

@ApiTags('processes')
@ApiBearerAuth()
@Controller('processes')
export class ProcessController {
  constructor(private processService: ProcessService) {}

  @Post()
  @ApiBody({
    description: 'Process information to be inserted.',
    type: CreateProcessDto,
  })
  @ApiResponse({
    description: 'The inserted user data, along with its identifier and additional fields.',
    type: UserDto,
    status: HttpStatus.CREATED,
  })
  @Roles('Admin', 'User')
  @UseGuards(JwtAuthGuard, RolesGuard)
  async create(@Body() body: CreateProcessDto): Promise<Process> {
    return this.processService.create(body);
  }

  @Delete(':id')
  @ApiParam({
    name: 'id',
    description: 'Id of process to be deleted!',
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
    await this.processService.delete(id);
  }
}
