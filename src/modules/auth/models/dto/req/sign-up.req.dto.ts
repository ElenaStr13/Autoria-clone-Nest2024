import { ApiProperty, PickType } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import {
  IsIn,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUUID,
} from 'class-validator';

import { TransformHelper } from '../../../../../common/helpers/transform.helper';
import { UserRoleEnum } from '../../../../../database/entities/enums/role.enum';
import { BaseAuthReqDto } from './base-auth.req.dto';

export class SignUpReqDto extends PickType(BaseAuthReqDto, [
  'name',
  'email',
  'password',
  'phone',
  'dealer',
  'role',
  'accountType',
  'deviceId',
]) {}

export class SignUpManagerReqDto extends PickType(BaseAuthReqDto, [
  'name',
  'email',
  'password',
  'phone',
  'deviceId',
]) {
  @ApiProperty({
    description: 'Role - manager',
    enum: ['manager'],
  })
  @Transform(TransformHelper.trim)
  @IsString()
  @IsNotEmpty()
  @IsIn([UserRoleEnum.MANAGER], {
    message: 'Role must be manager',
  })
  role: UserRoleEnum;

  @ApiProperty({
    description: 'ID автосалону, якщо користувач належить до автосалону',
    example: '1e43a56d-9307-4f50-8e1c-9784b15e8c3f',
    required: false,
  })
  @IsOptional()
  @IsUUID()
  dealerId?: string;
}
