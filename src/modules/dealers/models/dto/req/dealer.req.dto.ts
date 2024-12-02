import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsString } from 'class-validator';

import { TransformHelper } from '../../../../../common/helpers/transform.helper';

export class DealerReqDto {
  @ApiProperty({
    example: 'Автосалон "Autogroup"',
    description: 'Назва автосалону',
  })
  @IsString()
  @Transform(TransformHelper.trim)
  name: string;
}
