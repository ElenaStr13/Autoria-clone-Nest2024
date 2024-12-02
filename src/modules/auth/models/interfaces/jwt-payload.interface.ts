import { UserID } from '../../../../common/types/entity-ids.type';
//import { UserRoleEnum } from '../../../../database/entities/enums/role.enum';

export interface IJwtPayload {
  userId: UserID | string;
  //role: UserRoleEnum;
  deviceId?: string;
}
