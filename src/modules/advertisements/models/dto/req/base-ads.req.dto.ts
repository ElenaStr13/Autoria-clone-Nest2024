import { ApiProperty } from '@nestjs/swagger';
import { Transform, Type } from 'class-transformer';
import {
  IsEnum,
  IsIn,
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsPositive,
  IsString,
  IsUUID,
  Length,
  Matches,
  Max,
  Min,
} from 'class-validator';

import { TransformHelper } from '../../../../../common/helpers/transform.helper';
import { ConditionEnum } from '../../../../../database/entities/enums/condition.enum';
import { CurrencyEnum } from '../../../../../database/entities/enums/currency.enum';
import { LocationEnum } from '../../../../cars/models/enums/location.enum';

export class BaseAdsReqDto {
  @ApiProperty({
    example: 'Продам авто Renault Captur 2015 року',
    description: 'Заголовок оголошення',
  })
  @IsString()
  @IsNotEmpty({ message: 'Поле не може бути порожнім' })
  @Length(10, 150)
  @Matches(/^[a-zA-Z0-9а-яА-Я ]+$/)
  @Transform(TransformHelper.trim)
  @Type(() => String)
  title: string;

  @ApiProperty({
    example: 'Автомобіль в гарному стані. Пробіг 25000 км.',
    description: 'Тут описуються деталі про автомобіль та умови продажу',
  })
  @IsString()
  @IsNotEmpty()
  @Length(10, 3000, {
    message: 'Опис має бути не менше за 10 та не більше 3000 символів',
  })
  //@Matches(/^[a-zA-Z0-9а-яА-Я .,]+$/s)
  @Transform(TransformHelper.trim)
  description: string;

  @ApiProperty({
    example: 15000,
    description: 'Ціна',
  })
  @IsNumber()
  @IsPositive()
  @Min(0, { message: 'Ціна не може бути менше 0' })
  @Max(10000000, { message: 'Ціна не може більше 1 000 0000' })
  @IsNotEmpty()
  price: number;

  @ApiProperty({
    example: 'USD',
    enum: CurrencyEnum,
    description: 'Валюта ціни (USD, EUR, UAH)',
  })
  @IsEnum(CurrencyEnum)
  @IsIn([CurrencyEnum.EUR, CurrencyEnum.UAH, CurrencyEnum.USD])
  currency: CurrencyEnum;

  @ApiProperty({
    example: 'Одеса, Україна',
    enum: LocationEnum,
    description: 'Місцезнаходження автомобіля',
  })
  @IsEnum(LocationEnum)
  location: LocationEnum;

  @ApiProperty({
    example: 'нове',
    enum: ConditionEnum,
    description: 'Стан автомобіля (нове, б/в)',
  })
  @IsEnum(ConditionEnum)
  condition: ConditionEnum;

  @ApiProperty({
    example: true,
    description: 'Можливий торг',
    default: false,
  })
  @IsOptional()
  isNegotiable?: boolean;

  @ApiProperty({
    example: '123e4567-e89b-12d3-a456-426614174000',
    description: 'Ідентифікатор моделі автомобіля',
  })
  @IsNotEmpty({ message: 'Модель повинна бути обрана' })
  @IsUUID()
  @IsNotEmpty()
  modelId: number;

  @ApiProperty({ example: 2015, description: 'Рік випуску автомобіля' })
  @IsInt()
  @Min(1990)
  @Max(new Date().getFullYear())
  @Type(() => Number)
  @IsNotEmpty()
  year: number;

  @ApiProperty({
    example: 25000,
    description: 'Пробіг автомобіля (в км)',
  })
  @IsPositive()
  @Type(() => Number)
  @IsNotEmpty()
  mileage: number;
}
