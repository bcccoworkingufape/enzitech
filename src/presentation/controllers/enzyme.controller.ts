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
import { CreateUserDto } from '../dtos/user/create-user.dto';
import { ListUserFilterDto } from '../dtos/user/list-user-filter.dto';
import { ListUserDto } from '../dtos/user/list-user.dto';
import { UserDto } from '../dtos/user/user.dto';
import { EnzymeService } from '@/aplication/use-cases/enzyme.service';
import { CreateEnzymeDto } from '../dtos/enzyme/create-enzyme.dto';
import { Enzyme } from '@/domain/models/enzyme.entity';

@ApiTags('Enzymes')
@ApiBearerAuth()
@Controller('enzymes')
export class EnzymeController {
  constructor(private enzymeService: EnzymeService) {}

  @Post()
  @ApiBody({
    description: 'User information to be inserted.',
    type: CreateEnzymeDto,
  })
  @ApiResponse({
    type: Enzyme,
    status: HttpStatus.CREATED,
  })
  @Roles('Admin')
  @UseGuards(JwtAuthGuard, RolesGuard)
  async create(@Body() body: CreateEnzymeDto): Promise<Enzyme> {
    return this.enzymeService.create(body);

  }

  @Get()
  @ApiResponse({
    description: 'A list of enzymes.',
    type: Enzyme,
  })
  @Roles('Admin', 'User')
  @UseGuards(JwtAuthGuard, RolesGuard)
  async list(): Promise<Enzyme[]> {
    return this.enzymeService.list();
  }


  @Delete(':id')
  @ApiParam({
    name: 'id',
    description: 'Id of Enzyme to be deleted!',
  })
  @ApiResponse({
    type: undefined,
    status: HttpStatus.OK,
  })
  @Roles('Admin')
  @UseGuards(JwtAuthGuard, RolesGuard)
  async delete( @Param('id') id: string ): Promise<void> {
    await this.enzymeService.delete(id);
  }
}
