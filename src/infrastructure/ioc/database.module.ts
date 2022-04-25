import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TransactionRunner } from '../../domain/models/transaction-runner.provider';

@Module({
  imports: [TypeOrmModule.forRoot()],
  providers: [TransactionRunner],
  exports: [TransactionRunner],
})
export class DatabaseModule {}
