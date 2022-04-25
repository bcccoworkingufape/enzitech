import { Injectable, Logger } from '@nestjs/common';
import { PaginationDto } from '../presentation/dtos/shared/pagination.dto';
import { UserService } from '../aplication/use-cases/user.service';
import { Env } from '@/shared/helpers/env.helper';

@Injectable()
export class AppService {
  private readonly logger = new Logger(AppService.name);

  constructor(
    private readonly userService: UserService,
  ) {}

  getHealthCheck(): string {
    this.logger.debug('getHealthCheck');
    return 'Healthy';
  }
}
