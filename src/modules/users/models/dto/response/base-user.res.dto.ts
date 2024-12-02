import { UserID } from '../../../../../common/types/entity-ids.type';

export class BaseUserResDto {
  id: UserID;
  name: string;
  email: string;
  phone?: string;
  image?: string;
  role?: string;
  accountType?: string;
  isBanned?: boolean;
  createdAt: Date;
  updatedAt: Date;
}
