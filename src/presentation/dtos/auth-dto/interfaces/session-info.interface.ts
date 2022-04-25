import { ExternalUserToken } from '../../../../shared/interfaces/external-subscription/external-user-token.interface';
import { UserRole } from '../../user/enums/user-role.enum';

export interface SessionInfo {
  id: string;
  email: string;
  role: UserRole;
  externalSubscription: ExternalUserToken;
}
