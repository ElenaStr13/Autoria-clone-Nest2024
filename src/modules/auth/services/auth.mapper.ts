import { UserEntity } from '../../../database/entities/user.entity';
import { UserMapper } from '../../users/services/user.mapper';
import { AuthResDto } from '../models/dto/res/auth.res.dto';
import { TokenPairResDto } from '../models/dto/res/token-pair.res.dto';

export class AuthMapper {
  public static toResDto(
    userEntity: UserEntity,
    tokens: TokenPairResDto,
  ): AuthResDto {
    return {
      user: UserMapper.toResDto(userEntity),
      tokens,
    };
  }
}
