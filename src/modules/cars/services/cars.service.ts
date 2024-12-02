import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { BrandEntity } from '../../../database/entities/brand.entity';
import { CarEntity } from '../../../database/entities/car.entity';
import { BrandRepository } from '../../repository/services/brand.repository';
import { CarRepository } from '../../repository/services/car.repository';
import { carsDataItems } from '../models/cars-data.items';
import { BrandReqDto } from '../models/dto/request/brand.req.dto';
import { CreateCarReqDto } from '../models/dto/request/create-car.req.dto';
import { ModelReqDto } from '../models/dto/request/model.req.dto';
import { BrandResDto } from '../models/dto/response/brand.res.dto';
import { CarsResDto } from '../models/dto/response/car.res.dto';
import { CarsMapper } from './cars.mapper';

@Injectable()
export class CarsService {
  constructor(
    @InjectRepository(BrandEntity)
    private readonly brandRepository: BrandRepository,
    @InjectRepository(CarEntity)
    private readonly carRepository: CarRepository,
  ) {}

  public async createCar(dto: CreateCarReqDto): Promise<CarsResDto[]> {
    let brand = await this.brandRepository.findOne({
      where: { name: dto.name },
    });

    if (!brand) {
      brand = this.brandRepository.create({ name: dto.name });
      await this.brandRepository.save(brand);
    }

    const models: CarEntity[] = [];
    for (const model of dto.model) {
      let existingModel = await this.carRepository.findOne({
        where: { name: model, brand: { id: brand.id } },
        relations: ['brand'],
      });
      const nameModel = model; //model.name
      if (!existingModel) {
        existingModel = await this.carRepository.save(
          this.carRepository.create({
            name: nameModel,
            brand: brand,
          }),
        );
      }
      models.push(existingModel);
    }
    return CarsMapper.toResponseDtos(models);
  }

  public async createCars(dto: CreateCarReqDto[]): Promise<CarsResDto[]> {
    const result: CarsResDto[] = [];
    for (const item of dto) {
      const car = await this.createCar(item);
      result.push(...car);
    }
    return result;
  }

  public async getCars(): Promise<CarsResDto[]> {
    const brands = await this.brandRepository.find({
      relations: ['models', 'models.brand'],
    });

    const result: CarsResDto[] = [];
    for (const brand of brands) {
      for (const model of brand.models) {
        result.push(CarsMapper.toResponseDto(model));
      }
    }
    return result;
  }
  public async getCarById(id: string): Promise<CarsResDto> {
    const car = await this.carRepository.findOne({
      where: { id },
      relations: ['brand'],
    });

    if (!car) {
      throw new NotFoundException('Car not found');
    }
    return CarsMapper.toResponseDto(car);
  }
}
