import { PickType } from '@nestjs/swagger';
import { IsString } from 'class-validator';

import { BaseUserReqDto } from '../../../../users/models/dto/request/base-user.req.dto';

export class BaseAuthReqDto extends PickType(BaseUserReqDto, [
  'name',
  'email',
  'password',
  'phone',
  'image',
  'role',
  'accountType',
  'dealer',
]) {
  @IsString()
  readonly deviceId: string;
}
