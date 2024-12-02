import { ApiProperty } from '@nestjs/swagger';
import { Transform, Type } from 'class-transformer';
import {
  IsEnum,
  IsInt,
  IsNotEmpty,
  IsString,
  Length,
  Min,
  MinLength,
} from 'class-validator';

import { TransformHelper } from '../../../../../common/helpers/transform.helper';
import { LocationEnum } from '../../enums/location.enum';

export class CreateCarReqDto {
  @ApiProperty({
    example: 'Renault',
    description: 'Назва бренду',
  })
  @Transform(TransformHelper.trim)
  @IsString()
  @Length(3, 50)
  name?: string;

  @Transform(TransformHelper.trim)
  @Transform(TransformHelper.toLowerCase)
  @IsString()
  @Length(3, 50)
  @IsNotEmpty()
  model: string;

  @ApiProperty({ example: 2021 })
  @Type(() => Number)
  @IsInt()
  @Min(1900)
  year: number;

  @Transform(TransformHelper.trim)
  @Transform(TransformHelper.toLowerCase)
  @IsString()
  @Length(3, 50)
  producer: string;

  @Type(() => Number)
  @IsNotEmpty()
  price: number;

  @IsNotEmpty()
  @Length(3, 4)
  @IsString()
  currency: string;

  @ApiProperty({
    example: 'Київ, Україна',
    description: 'Де знаходиться автомобіль',
  })
  @IsEnum(LocationEnum)
  location: LocationEnum;

  @IsString()
  @MinLength(4)
  @IsString()
  description: string;

  @Transform(TransformHelper.trim)
  @Transform(TransformHelper.toLowerCase)
  @IsString()
  modelId: string;

  @Transform(TransformHelper.trim)
  @Transform(TransformHelper.toLowerCase)
  @IsString()
  brandId: string;
}