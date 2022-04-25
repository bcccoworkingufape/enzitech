import { Injectable } from '@nestjs/common';
import { InjectEntityManager } from '@nestjs/typeorm';
import { EntityManager } from 'typeorm';

@Injectable()
export class TransactionRunner {
  constructor(
    @InjectEntityManager()
    private entityManager: EntityManager,
  ) {}

  async run<T>(func: (transactionManager: EntityManager) => Promise<T | void>): Promise<T | void> {
    return this.entityManager.transaction(func);
  }
}
