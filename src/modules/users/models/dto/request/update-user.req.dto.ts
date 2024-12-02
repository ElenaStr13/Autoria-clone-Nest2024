import { PickType } from '@nestjs/swagger';

import { BaseUserReqDto } from './base-user.req.dto';

export class UpdateUserReqDto extends PickType(BaseUserReqDto, ['name']) {}

export class UpdateUserStatusDto extends PickType(BaseUserReqDto, [
  'isBanned',
]) {}
