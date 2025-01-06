import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiBody,
  ApiNotFoundResponse,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';

import { RolesGuard } from '../../common/guards/role.guard';
import { UserRoleEnum } from '../../database/entities/enums/role.enum';
import { Roles } from '../users/decorators/role.decorator';
import { IBrandModels } from './models/brand-model.interface';
import { carsDataItems } from './models/cars-data.items';
import { BrandReqDto } from './models/dto/request/brand.req.dto';
import { CreateCarReqDto } from './models/dto/request/create-car.req.dto';
import { ModelReqDto } from './models/dto/request/model.req.dto';
import { BrandResDto } from './models/dto/response/brand.res.dto';
import { CarsResDto } from './models/dto/response/car.res.dto';
import { LocationEnum } from './models/enums/location.enum';
import { CarsService } from './services/cars.service';

@ApiBearerAuth()
@ApiTags('Cars')
@Controller('cars')
@UseGuards(RolesGuard)
export class CarsController {
  constructor(private readonly carsService: CarsService) {}

  @ApiOperation({ summary: 'Create new models (role must be ADMIN)' })
  @Post('create-cars')
  @ApiBody({ type: [CreateCarReqDto] })
  @ApiResponse({
    status: 201,
    description: 'Successfully created new cars',
    type: [CarsResDto],
  })
  @Roles(UserRoleEnum.ADMIN)
  public async createCars(
    @Body() dto: CreateCarReqDto[],
  ): Promise<CarsResDto[]> {
    const dataToService =
      dto.length > 0
        ? dto
        : this.carsService.TransformToCreateCarReqDto(carsDataItems);
    return await this.carsService.createCars(dataToService);
  }

  @ApiOperation({ summary: 'Get all cars' })
  @Get('get-cars')
  public async getCars(): Promise<CarsResDto[]> {
    return await this.carsService.getCars();
  }

  @ApiOperation({ summary: 'Get car by id' })
  @ApiResponse({
    status: 200,
    description: 'Successfully retrieved the car',
    type: CarsResDto,
  })
  @ApiNotFoundResponse({ description: 'Car not found' })
  @ApiResponse({ status: 500, description: 'Internal server error' })
  @Get('get-car/:id')
  @Roles(UserRoleEnum.ADMIN)
  public async getCarById(
    @Param('id', ParseUUIDPipe) id: string,
  ): Promise<CarsResDto> {
    return await this.carsService.getCarById(id);
  }

  @ApiOperation({ summary: 'Get brand with models by ID' })
  @ApiResponse({
    status: 200,
    description: 'Successfully retrieved the brand with models',
    type: [CarsResDto],
  })
  @ApiNotFoundResponse({ description: 'Brand not found' })
  @ApiResponse({ status: 500, description: 'Internal server error' })
  @Get('get-brand/:id')
  public async getBrandById(
    @Param('id', ParseUUIDPipe) id: string,
  ): Promise<CarsResDto[]> {
    return await this.carsService.getBrandById(id);
  }

  @ApiOperation({ summary: 'Update brand by ID (role must be ADMIN)' })
  @ApiResponse({
    status: 200,
    description: 'Successfully updated the brand',
    type: BrandResDto,
  })
  @ApiNotFoundResponse({ description: 'Brand not found' })
  @ApiResponse({ status: 400, description: 'Bad request, validation error' })
  @ApiResponse({ status: 500, description: 'Internal server error' })
  @Put('update-brand/:id')
  @Roles(UserRoleEnum.ADMIN)
  public async updateBrand(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() dto: BrandReqDto,
  ): Promise<BrandResDto> {
    return await this.carsService.updateBrand(id, dto);
  }

  @ApiOperation({ summary: 'Delete brand by ID  (role must be ADMIN)' })
  @Roles(UserRoleEnum.ADMIN)
  @ApiResponse({ status: 204, description: 'Successfully deleted the brand' })
  @ApiNotFoundResponse({ description: 'Brand not found' })
  @ApiResponse({ status: 500, description: 'Internal server error' })
  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete('delete-brand/:id')
  public async deleteBrand(
    @Param('id', ParseUUIDPipe) id: string,
  ): Promise<void> {
    await this.carsService.deleteBrand(id);
  }

  @ApiOperation({ summary: 'Add new model to a brand  (role must be ADMIN)' })
  @ApiResponse({
    status: 201,
    description: 'Successfully added a new model to the brand',
    type: CarsResDto,
  })
  @ApiNotFoundResponse({ description: 'Brand not found' })
  @ApiResponse({ status: 400, description: 'Bad request, validation error' })
  @ApiResponse({ status: 500, description: 'Internal server error' })
  @Post('add-model/:brandId')
  @Roles(UserRoleEnum.ADMIN)
  public async addModelToBrand(
    @Param('brandId', ParseUUIDPipe) brandId: string,
    @Body() dto: ModelReqDto,
  ): Promise<CarsResDto> {
    return await this.carsService.addModelToBrand(brandId, dto);
  }

  @ApiOperation({ summary: 'Update model by ID (role must be ADMIN)' })
  @ApiResponse({
    status: 200,
    description: 'Successfully updated the model',
    type: CarsResDto,
  })
  @ApiNotFoundResponse({ description: 'Model not found' })
  @ApiResponse({ status: 400, description: 'Bad request, validation error' })
  @ApiResponse({ status: 500, description: 'Internal server error' })
  @Put('update-model/:id')
  @Roles(UserRoleEnum.ADMIN)
  public async updateModel(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() dto: ModelReqDto,
  ): Promise<CarsResDto> {
    return await this.carsService.updateModel(id, dto);
  }
  @ApiOperation({ summary: 'Delete model by ID (role must be ADMIN)' })
  @ApiResponse({ status: 204, description: 'Successfully deleted the model' })
  @ApiNotFoundResponse({ description: 'Model not found' })
  @ApiResponse({ status: 500, description: 'Internal server error' })
  @Delete('delete-model/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @Roles(UserRoleEnum.ADMIN)
  public async deleteModel(
    @Param('id', ParseUUIDPipe) id: string,
  ): Promise<void> {
    await this.carsService.deleteModel(id);
  }
}
