import { PickType } from '@nestjs/swagger';
import { IsUUID } from 'class-validator';

import { BaseUserResDto } from './base-user.res.dto';

export class UserResDto extends PickType(BaseUserResDto, [
  'id',
  'name',
  'email',
  'phone',
  'image',
  'role',
  'accountType',
  'isBanned',
]) {
  @IsUUID()
  dealer?: string;
}
