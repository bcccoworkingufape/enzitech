import { EntityRepository, Repository } from 'typeorm';
import { AuthSession } from '../../../domain/models/auth-session.entity';

@EntityRepository(AuthSession)
export class AuthSessionRepository extends Repository<AuthSession> {}
