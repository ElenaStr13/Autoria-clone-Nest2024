import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';

import { CurrentUser } from './decorators/current-user.decorator';
import { SkipAuth } from './decorators/skip-auth.decorator';
import { JwtRefreshGuard } from './guards/jwt-refresh.guard';
import { SignInReqDto } from './models/dto/req/sign-in.req.dto';
import { SignUpReqDto } from './models/dto/req/sign-up.req.dto';
import { AuthResDto } from './models/dto/res/auth.res.dto';
import { TokenPairResDto } from './models/dto/res/token-pair.res.dto';
import { IUserData } from './models/interfaces/user-data.interface';
import { AuthService } from './services/auth.service';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  @ApiOperation({ summary: 'Register a new user' })
  @SkipAuth()
  @Post('sign-up')
  public async signUp(@Body() dto: SignUpReqDto): Promise<AuthResDto> {
    return await this.authService.SignUp(dto);
  }

  @ApiOperation({ summary: 'Sign in user' })
  @SkipAuth()
  @Post('sign-in')
  public async signInSeller(@Body() dto: SignInReqDto): Promise<AuthResDto> {
    return await this.authService.SignIn(dto);
  }

  @ApiOperation({ summary: 'Get new access and refresh tokens' })
  @ApiBearerAuth()
  @UseGuards(JwtRefreshGuard)
  @SkipAuth()
  @Post('refresh')
  public async refresh(
    @CurrentUser() userData: IUserData,
  ): Promise<TokenPairResDto> {
    return await this.authService.refresh(userData);
  }
  @ApiOperation({ summary: 'Logout user' })
  @ApiBearerAuth()
  @HttpCode(HttpStatus.NO_CONTENT)
  @Post('sign-out')
  public async signOut(@CurrentUser() userData: IUserData): Promise<void> {
    await this.authService.signOut(userData);
  }
}
