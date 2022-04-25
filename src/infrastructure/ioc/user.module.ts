import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth.module';
import { DatabaseModule } from './database.module';
import { UserController } from '../../presentation/controllers/user.controller';
import { UserRepository } from '../database/repositories/user.repository';
import { UserService } from '../../aplication/use-cases/user.service';


@Module({
  imports: [
    TypeOrmModule.forFeature([
      UserRepository,
    ]),
    DatabaseModule,
    AuthModule,
  ],
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService],
})
export class UserModule {}
