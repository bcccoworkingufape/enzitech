import { UserRole } from '../enums/user-role.enum';

export interface ListUserParam {
  name?: string | null;
  email?: string | null;
  role?: UserRole | null;
  page: number;
  orderBy?: string | null;
  ordering: 'ASC' | 'DESC';
  limit: number;
  initialDate?: string | null;
  finalDate?: string | null;
}
