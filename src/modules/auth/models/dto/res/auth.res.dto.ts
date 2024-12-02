import { UserResDto } from '../../../../users/models/dto/response/user.res.dto';
import { TokenPairResDto } from './token-pair.res.dto';

export class AuthResDto {
  tokens: TokenPairResDto;
  user: UserResDto;
}
