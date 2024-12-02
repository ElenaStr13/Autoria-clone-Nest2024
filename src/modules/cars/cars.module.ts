import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { BrandEntity } from '../../database/entities/brand.entity';
import { CarEntity } from '../../database/entities/car.entity';
import { CarsController } from './cars.controller';
import { CarsService } from './services/cars.service';

@Module({
  imports: [TypeOrmModule.forFeature([CarEntity, BrandEntity])],
  controllers: [CarsController],
  providers: [CarsService],
})
export class CarsModule {}
