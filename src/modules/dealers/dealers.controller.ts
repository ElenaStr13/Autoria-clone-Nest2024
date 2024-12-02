import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseUUIDPipe,
  Post,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';

import { RolesGuard } from '../../common/guards/role.guard';
import { UserRoleEnum } from '../../database/entities/enums/role.enum';
import { Roles } from '../users/decorators/role.decorator';
import { DealerReqDto } from './models/dto/req/dealer.req.dto';
import { DealerResDto } from './models/dto/res/dealer.res.dto';
import { DealerService } from './services/dealers.service';

@ApiBearerAuth()
@ApiTags('Dealers')
@Controller('dealers')
@UseGuards(RolesGuard)
export class DealersController {
  constructor(private readonly dealerService: DealerService) {}

  @ApiOperation({ summary: 'Create a new dealer (role must be ADMIN)' })
  @Post()
  @Roles(UserRoleEnum.ADMIN)
  public async createDealership(
    @Body() dto: DealerReqDto,
  ): Promise<DealerResDto> {
    return await this.dealerService.createDealer(dto);
  }

  @ApiOperation({ summary: 'Get all dealers' })
  @Get()
  public async getDealers(): Promise<DealerResDto[]> {
    return await this.dealerService.getDealers();
  }

  @ApiOperation({ summary: 'Get dealer by ID' })
  @Get(':id')
  public async getDealershipById(
    @Param('id', ParseUUIDPipe) id: string,
  ): Promise<DealerResDto> {
    return await this.dealerService.getDealerById(id);
  }

  @ApiOperation({ summary: 'Delete dealer by ID (role must be ADMIN)' })
  @Delete(':id')
  @Roles(UserRoleEnum.ADMIN)
  @HttpCode(HttpStatus.NO_CONTENT)
  public async deleteDealer(
    @Param('id', ParseUUIDPipe) id: string,
  ): Promise<void> {
    await this.dealerService.deleteDealership(id);
  }
}
