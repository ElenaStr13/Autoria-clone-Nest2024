import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import {
  IsBoolean,
  IsEnum,
  IsIn,
  IsOptional,
  IsPhoneNumber,
  IsString,
  IsUUID,
  Length,
  Matches,
} from 'class-validator';

import { TransformHelper } from '../../../../../common/helpers/transform.helper';
import { UserAccountTypeEnum } from '../../../../../database/entities/enums/account.enum';
import { UserRoleEnum } from '../../../../../database/entities/enums/role.enum';

export class BaseUserReqDto {
  @ApiProperty({
    example: 'Olena',
  })
  @IsString()
  @Length(2, 50)
  @Transform(TransformHelper.trim)
  name?: string;

  @ApiProperty()
  @Transform(TransformHelper.trim)
  @IsString()
  @IsPhoneNumber()
  phone?: string;

  @IsString()
  @Transform(TransformHelper.toLowerCase)
  @Length(0, 10000)
  image?: string;

  @ApiProperty({
    example: 'test5@gmail.com',
  })
  @IsString()
  @Length(0, 300)
  @Matches(/^[^\s@]+@([^\s@.,]+\.)+[^\s@.,]{2,}$/)
  email: string;

  @ApiProperty({
    example: 'test131313.',
  })
  @IsString()
  @Matches(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%_*#?&.])[A-Za-z\d@$!%*#?&.]{8,}$/)
  password: string;

  @IsEnum(UserRoleEnum)
  @ApiProperty()
  @IsIn([UserRoleEnum.BUYER, UserRoleEnum.SELLER], {
    message: 'Роль повинна бути buyer або seller',
  })
  role: UserRoleEnum;

  @IsString()
  deviceId?: string | null;

  @IsEnum(UserAccountTypeEnum)
  @IsIn([UserAccountTypeEnum.BASIC])
  accountType?: UserAccountTypeEnum;

  @ApiProperty({
    example: 'false',
    description: 'Whether the user is banned or not',
  })
  @IsBoolean()
  @IsOptional()
  isBanned: boolean;

  @ApiProperty({
    description: 'ID автосалону, якщо він належить до автосалону',
    example: '13ef4567-1234-4abc-8901-567890abcdef',
    required: false,
  })
  @IsString()
  @IsUUID()
  dealer?: string;
}
