import { UserID } from '../../../../common/types/entity-ids.type';
import { UserAccountTypeEnum } from '../../../../database/entities/enums/account.enum';
import { UserRoleEnum } from '../../../../database/entities/enums/role.enum';

export interface IUserData {
  userId: UserID;
  email: string;
  role: UserRoleEnum;
  accountType: UserAccountTypeEnum;
  deviceId: string;
}
