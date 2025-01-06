import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { BrandEntity } from '../../../database/entities/brand.entity';
import { CarEntity } from '../../../database/entities/car.entity';
import { BrandRepository } from '../../repository/services/brand.repository';
import { CarRepository } from '../../repository/services/car.repository';
import { IBrandModels } from '../models/brand-model.interface';
import { BrandReqDto } from '../models/dto/request/brand.req.dto';
import { CreateCarReqDto } from '../models/dto/request/create-car.req.dto';
import { ModelReqDto } from '../models/dto/request/model.req.dto';
import { BrandResDto } from '../models/dto/response/brand.res.dto';
import { CarsResDto } from '../models/dto/response/car.res.dto';
import { LocationEnum } from '../models/enums/location.enum';
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
        where: { name: model.name, brand: { id: brand.id } },
        relations: ['brand'],
      });
      if (!existingModel) {
        existingModel = await this.carRepository.save(
          this.carRepository.create({
            name: model.name,
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

  public async getBrandById(id: string): Promise<CarsResDto[]> {
    const brand = await this.brandRepository.findOne({
      where: { id },
      relations: ['models', 'models.brand'],
    });
    if (!brand) {
      throw new NotFoundException(`Brand with ID ${id} not found`);
    }
    return CarsMapper.toResponseDtos(brand.models);
  }

  public async updateBrand(id: string, dto: BrandReqDto): Promise<BrandResDto> {
    const brand = await this.brandRepository.findOne({ where: { id } });
    if (!brand) {
      throw new NotFoundException(`Brand with ID ${id} not found`);
    }
    brand.name = dto.name;
    await this.brandRepository.save(brand);
    return {
      id: brand.id,
      name: brand.name,
      createdAt: brand.created,
      updatedAt: brand.updated,
    };
  }
  public async deleteBrand(id: string): Promise<void> {
    const brand = await this.brandRepository.findOne({
      where: { id },
      relations: ['models'],
    });
    if (!brand) {
      throw new NotFoundException(`Brand with ID ${id} not found`);
    }
    await this.brandRepository.remove(brand);
  }

  public async addModelToBrand(
    brandId: string,
    dto: ModelReqDto,
  ): Promise<CarsResDto> {
    const brand = await this.brandRepository.findOne({
      where: { id: brandId },
    });
    if (!brand) {
      throw new NotFoundException(`Brand with ID ${brandId} not found`);
    }

    const newModel = this.carRepository.create({ name: dto.name, brand });
    await this.carRepository.save(newModel);

    return CarsMapper.toResponseDto(newModel);
  }

  public async updateModel(id: string, dto: ModelReqDto): Promise<CarsResDto> {
    const model = await this.carRepository.findOne({
      where: { id },
      relations: ['brand'],
    });
    if (!model) {
      throw new NotFoundException(`Model with ID ${id} not found`);
    }
    model.name = dto.name;
    await this.carRepository.save(model);
    return CarsMapper.toResponseDto(model);
  }
  public async deleteModel(id: string): Promise<void> {
    const model = await this.carRepository.findOne({ where: { id } });
    if (!model) {
      throw new NotFoundException(`Model with ID ${id} not found`);
    }
    await this.carRepository.remove(model);
  }

  public TransformToCreateCarReqDto(items: IBrandModels): CreateCarReqDto[] {
    const result: CreateCarReqDto[] = [];
    for (const brand of items) {
      for (const model of brand.models) {
        result.push({
          name: brand.name,
          model: [{ name: model.name }], // Моделі обгортаються в масив
          year: new Date().getFullYear(), // Додайте логіку визначення року
          producer: 'default_producer', // Або отримайте з іншого джерела
          price: 1, // Вкажіть логіку визначення ціни
          currency: 'USD', // Або іншу валюту
          location: LocationEnum['Київ, Україна'], // Приклад значення
          description: 'Default description', // Додайте опис
          modelId: 'default_model_id',
          brandId: 'default_brand_id',
        });
      }
    }
    return result;
  }
}
