import { Controller, Get} from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { AppService } from './app.service';

@ApiTags('Health Checks')
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @ApiResponse({
    type: String,
    description: `returns the string 'Healthy' in case of success.`,
  })
  @Get('/health')
  healthCheck(): string {
    return this.appService.getHealthCheck();
  }
}
