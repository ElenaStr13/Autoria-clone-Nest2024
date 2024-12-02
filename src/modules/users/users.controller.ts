import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Put,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import {
  ApiBearerAuth,
  ApiConsumes,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';

import { ApiFile } from '../../common/decorators/api-file.decorator';
import { RolesGuard } from '../../common/guards/role.guard';
import { UserRoleEnum } from '../../database/entities/enums/role.enum';
import { CurrentUser } from '../auth/decorators/current-user.decorator';
import { JwtAccessGuard } from '../auth/guards/jwt-access.guard';
import { SignUpManagerReqDto } from '../auth/models/dto/req/sign-up.req.dto';
import { AuthResDto } from '../auth/models/dto/res/auth.res.dto';
import { IUserData } from '../auth/models/interfaces/user-data.interface';
import { Roles } from './decorators/role.decorator';
import { UpdateUserReqDto } from './models/dto/request/update-user.req.dto';
import { UserResDto } from './models/dto/response/user.res.dto';
import { AdminService } from './services/admin.service';
import { UsersService } from './services/users.service';

@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    private readonly adminService: AdminService,
  ) {}

  @ApiOperation({ summary: 'User login' })
  @ApiBearerAuth()
  @Get('me')
  @UseGuards(JwtAccessGuard)
  public async findMe(@CurrentUser() userData: IUserData): Promise<UserResDto> {
    return await this.usersService.findMe(userData);
  }

  @ApiOperation({ summary: 'Update user' })
  @ApiBearerAuth()
  @Put('Update-me')
  public async updateMe(
    @CurrentUser() userData: IUserData,
    @Body() dto: UpdateUserReqDto,
  ): Promise<UserResDto> {
    return await this.usersService.updateMe(userData, dto);
  }

  @ApiOperation({ summary: 'Delete user' })
  @ApiBearerAuth()
  @Delete('Delete-me')
  public async deleteMe(@CurrentUser() userData: IUserData): Promise<void> {
    await this.usersService.deleteMe(userData);
  }

  @ApiOperation({ summary: 'Create manager' })
  @ApiBearerAuth()
  @UseGuards(RolesGuard)
  @Roles(UserRoleEnum.ADMIN)
  @Post('Create-manager')
  public async createManager(
    @Body() dto: SignUpManagerReqDto,
  ): Promise<AuthResDto> {
    return await this.adminService.createManager(dto);
  }

  @ApiOperation({ summary: 'Upload avatar' })
  @ApiBearerAuth()
  @UseInterceptors(FileInterceptor('avatar'))
  @ApiConsumes('multipart/form-data')
  @ApiFile('avatar', false, true)
  @Post('me/avatar')
  public async uploadAvatar(
    @UploadedFile() avatar: Express.Multer.File,
    @CurrentUser() userData: IUserData,
  ): Promise<void> {
    await this.usersService.uploadAvatar(userData, avatar);
  }
  @ApiOperation({ summary: 'Delete avatar' })
  @ApiBearerAuth()
  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete('me/avatar')
  public async deleteAvatar(@CurrentUser() userData: IUserData): Promise<void> {
    await this.usersService.deleteAvatar(userData);
  }
}
