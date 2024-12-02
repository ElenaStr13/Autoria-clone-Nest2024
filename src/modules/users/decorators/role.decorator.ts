import { SetMetadata } from '@nestjs/common';

import { UserAccountTypeEnum } from '../../../database/entities/enums/account.enum';
import { UserRoleEnum } from '../../../database/entities/enums/role.enum';

export const Roles = (...roles: UserRoleEnum[]) => SetMetadata('roles', roles);

export const AccountTypes = (...accountTypes: UserAccountTypeEnum[]) =>
  SetMetadata('accountTypes', accountTypes);
