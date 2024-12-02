import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsString } from 'class-validator';

import { TransformHelper } from '../../../../../common/helpers/transform.helper';

export class ModelReqDto {
  @ApiProperty({
    example: 'Captur',
    description: 'Назва моделі автомобіля',
  })
  @IsString()
  @Transform(TransformHelper.toLowerCase)
  @Transform(TransformHelper.trim)
  name: string;
}
