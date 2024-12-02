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
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiBody,
  ApiForbiddenResponse,
  ApiInternalServerErrorResponse,
  ApiNotFoundResponse,
  ApiOperation,
  ApiResponse,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';

import { RolesGuard } from '../../common/guards/role.guard';
import { UserRoleEnum } from '../../database/entities/enums/role.enum';
import { Roles } from '../users/decorators/role.decorator';
import { carsDataItems } from './models/cars-data.items';
import { CreateCarReqDto } from './models/dto/request/create-car.req.dto';
import { CarsResDto } from './models/dto/response/car.res.dto';
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
  @ApiBadRequestResponse({ description: 'Bad request, validation error' })
  @ApiUnauthorizedResponse({
    description: 'Unauthorized, token missing or invalid',
  })
  @ApiForbiddenResponse({
    description: 'Forbidden, user does not have the required role',
  })
  @ApiInternalServerErrorResponse({ description: 'Internal server error' })
  @Roles(UserRoleEnum.ADMIN)
  public async createCars(
    @Body() dto: CreateCarReqDto[],
  ): Promise<CarsResDto[]> {
    const dataToService = dto; //dto.length > 0 ? dto : carsDataItems;
    return await this.carsService.createCars(dataToService);
  }

  @ApiOperation({ summary: 'Get all cars' })
  @Get('get-cars')
  public async getCars(): Promise<CarsResDto[]> {
    return await this.carsService.getCars();
  }
}
