import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsNotEmpty, IsString } from 'class-validator';

import { TransformHelper } from '../../../../../common/helpers/transform.helper';

export class BrandReqDto {
  @ApiProperty({
    example: 'Renault',
    description: 'Назва бренду',
  })
  @IsString()
  @IsNotEmpty()
  @Transform(TransformHelper.trim)
  @Transform(TransformHelper.toLowerCase)
  name: string;
}
