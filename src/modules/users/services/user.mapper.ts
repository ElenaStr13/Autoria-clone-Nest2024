import { UserID } from '../../../common/types/entity-ids.type';
import { UserEntity } from '../../../database/entities/user.entity';
import { IJwtPayload } from '../../auth/models/interfaces/jwt-payload.interface';
import { UserResDto } from '../models/dto/response/user.res.dto';

export class UserMapper {
  public static toResDto(user: UserEntity): UserResDto {
    return {
      id: user.id as UserID,
      name: user.name,
      email: user.email,
      role: user.role,
      accountType: user.accountType,
      isBanned: user.isBanned,
    };
  }

  public static toIUserData(user: UserEntity, jwtPayload: IJwtPayload): any {
    return {
      userId: user.id,
      deviceId: jwtPayload.deviceId,
      email: user.email,
      role: user.role,
    };
  }
}
