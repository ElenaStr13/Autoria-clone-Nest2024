import {
  Body,
  Controller,
  Param,
  ParseUUIDPipe,
  Put,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';

import { RolesGuard } from '../../common/guards/role.guard';
import { UserAccountTypeEnum } from '../../database/entities/enums/account.enum';
import { UserRoleEnum } from '../../database/entities/enums/role.enum';
import { CurrentUser } from '../auth/decorators/current-user.decorator';
import { IUserData } from '../auth/models/interfaces/user-data.interface';
import { Roles } from './decorators/role.decorator';
import { UpdateUserStatusDto } from './models/dto/request/update-user.req.dto';
import { UserResDto } from './models/dto/response/user.res.dto';
import { ManagerService } from './services/manager.service';
import { UserMapper } from './services/user.mapper';

@ApiTags('Managers')
@Controller('managers')
@UseGuards(RolesGuard)
export class ManagerController {
  constructor(private readonly managerService: ManagerService) {}

  @ApiBearerAuth()
  @ApiOperation({
    summary: 'Update user account type (admin or manager only)',
  })
  @Put(':id/user-account-type')
  @Roles(UserRoleEnum.ADMIN, UserRoleEnum.MANAGER)
  public async updateAds(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() dto: { accountType: UserAccountTypeEnum },
    @CurrentUser() userData: IUserData,
  ): Promise<UserResDto> {
    const updatedUser = await this.managerService.updateAccountType(
      id,
      dto.accountType,
      userData,
    );
    return UserMapper.toResDto(updatedUser);
  }

  @ApiBearerAuth()
  @ApiOperation({
    summary: 'Update user status(admin or manager only)',
  })
  @Put(':id/user-status')
  @Roles(UserRoleEnum.ADMIN, UserRoleEnum.MANAGER)
  public async updateUserStatus(
    @Param('id', ParseUUIDPipe) id: string,
    @CurrentUser() userData: IUserData,
    @Body() dto: UpdateUserStatusDto,
  ): Promise<UserResDto> {
    const updatedUser = await this.managerService.updateUserStatus(
      id,
      dto.isBanned,
      userData,
    );
    return UserMapper.toResDto(updatedUser);
  }
}
