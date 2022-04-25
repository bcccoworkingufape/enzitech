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
  OmitType,
} from '@nestjs/swagger';
import { Request } from 'express';
import { Roles } from '../../shared/decorators/roles.decorator';
import { JwtAuthGuard } from '../../infrastructure/security/guards/jwt-auth.guard';
import { RolesGuard } from '../../infrastructure/security/guards/roles.guard';
import { SessionInfo } from '../dtos/auth-dto/interfaces/session-info.interface';
import { CreateUserDto } from '../dtos/user/create-user.dto';
import { ListUserFilterDto } from '../dtos/user/list-user-filter.dto';
import { ListUserDto } from '../dtos/user/list-user.dto';
import { UpdateUserDto } from '../dtos/user/update-user.dto';
import { UserDto } from '../dtos/user/user.dto';
import { UserService } from '../../aplication/use-cases/user.service';
import { UserRole } from '../dtos/user/enums/user-role.enum';

@ApiTags('Users')
@ApiBearerAuth()
@Controller('users')
export class UserController {
  constructor(private userService: UserService) {}

  @Post()
  @ApiBody({
    description: 'User information to be inserted.',
    type: CreateUserDto,
  })
  @ApiResponse({
    description: 'The inserted user data, along with its identifier and additional fields.',
    type: UserDto,
    status: HttpStatus.CREATED,
  })
  async create(@Body() body: CreateUserDto): Promise<UserDto> {
    const user = await this.userService.create(body);

    return new UserDto(user);
  }

  @Get()
  @ApiResponse({
    description: 'A list of users matching the corresponding filters.',
    type: ListUserDto,
  })
  @Roles('Admin')
  @UseGuards(JwtAuthGuard, RolesGuard)
  async list(@Query() filter: ListUserFilterDto): Promise<ListUserDto> {
    return this.userService.list(filter);
  }

  @Put(':id')
  @ApiParam({
    name: 'id',
    description: 'Id of User to be updated!',
  })
  @ApiBody({
    description: 'User data to be updated.',
    type: OmitType(UpdateUserDto, ['password']),
  })
  @ApiResponse({
    description: 'The updated user data.',
    type: UserDto,
    status: HttpStatus.OK,
  })
  @Roles('Admin')
  @UseGuards(JwtAuthGuard, RolesGuard)
  async updateById(@Param('id') id: string, @Body() body: UpdateUserDto): Promise<UserDto> {
    const user = await this.userService.update(id, body);

    return new UserDto(user);
  }

  @Delete(':id')
  @ApiParam({
    name: 'id',
    description: 'Id of User to be deleted!',
  })
  @ApiResponse({
    type: undefined,
    status: HttpStatus.OK,
  })
  @Roles('Admin')
  @UseGuards(JwtAuthGuard, RolesGuard)
  async delete(
    @Param('id') id: string,
    @Req() request: { request: Request; user: SessionInfo },
  ): Promise<void> {
    if (id === request.user.id) {
      throw new HttpException('Não é permitido deletar sua propria conta', HttpStatus.BAD_REQUEST);
    }
    await this.userService.delete(id);
  }
}
