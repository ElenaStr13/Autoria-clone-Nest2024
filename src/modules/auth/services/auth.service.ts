import { Injectable, UnauthorizedException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { DataSource } from 'typeorm';

import { UserID } from '../../../common/types/entity-ids.type';
import { UserRoleEnum } from '../../../database/entities/enums/role.enum';
import { DealerRepository } from '../../repository/services/dealer.repository';
import { RefreshTokenRepository } from '../../repository/services/refresh-token.repository';
import { UserRepository } from '../../repository/services/user.repository';
import { UserMapper } from '../../users/services/user.mapper';
import { UsersService } from '../../users/services/users.service';
import { SignInReqDto } from '../models/dto/req/sign-in.req.dto';
import { SignUpReqDto } from '../models/dto/req/sign-up.req.dto';
import { AuthResDto } from '../models/dto/res/auth.res.dto';
import { TokenPairResDto } from '../models/dto/res/token-pair.res.dto';
import { IUserData } from '../models/interfaces/user-data.interface';
import { AuthCacheService } from './auth-cache-service';
import { TokenService } from './token.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly authCacheService: AuthCacheService,
    private readonly tokenService: TokenService,
    private readonly userService: UsersService,
    private readonly userRepository: UserRepository,
    private readonly refreshTokenRepository: RefreshTokenRepository,
    private readonly dataSource: DataSource,
    private readonly dealerRepository: DealerRepository,
    // @InjectEntityManager()
    // private readonly entityManager: EntityManager,
  ) {}

  public async SignUp(dto: SignUpReqDto): Promise<AuthResDto> {
    const user_found = await this.userService.isUserExistOrThrow(dto.email);
    if (user_found?.role === UserRoleEnum.ADMIN) {
      return;
    }
    const password = await bcrypt.hash(dto.password, 7);
    let dealer = null;
    if (dto.dealer) {
      // Знайти автосалон за його ID
      dealer = await this.dealerRepository.findOne({
        where: { id: dto.dealer },
      });
      if (!dealer) {
        // const dealerId = await this.dealerRepository.save(
        //   this.dealerRepository.create({...dto }),
        //   console.log(dealerId);
        //  );
        throw new Error('Dealer not found');
      }
    }

    const user = await this.userRepository.save(
      this.userRepository.create({
        ...dto,
        password,
        dealer,
      }),
    );

    const tokens = await this.tokenService.generateAuthTokens({
      userId: user.id,
      deviceId: dto.deviceId,
    });

    await Promise.all([
      this.refreshTokenRepository.save({
        deviceId: dto.deviceId,
        refreshToken: tokens.refreshToken,
        user_id: user.id,
      }),
      this.authCacheService.saveToken(
        tokens.accessToken,
        user.id,
        dto.deviceId,
      ),
    ]);
    return { user: UserMapper.toResDto(user), tokens };
  }

  public async SignIn(dto: SignInReqDto): Promise<AuthResDto> {
    const user = await this.userRepository.findOne({
      where: { email: dto.email },
      select: { id: true, password: true },
    });
    if (!user) {
      throw new UnauthorizedException();
    }
    const isPasswordValid = bcrypt.compare(dto.password, user.password);
    if (!isPasswordValid) {
      throw new UnauthorizedException();
    }
    const tokens = await this.tokenService.RefreshTokens({
      deviceId: dto.deviceId,
      userId: user.id as UserID,
      email: user.email,
      role: user.role,
      accountType: user.accountType,
    });
    const userEntity = await this.userRepository.findOneBy({ id: user.id });
    return { user: UserMapper.toResDto(userEntity), tokens };
  }

  public async refresh(userData: IUserData): Promise<TokenPairResDto> {
    return await this.tokenService.RefreshTokens(userData);
  }

  public async signOut(userData: IUserData): Promise<void> {
    await Promise.all([
      this.refreshTokenRepository.delete({
        deviceId: userData.deviceId,
        user_id: userData.userId,
      }),
      this.authCacheService.deleteToken(userData.userId, userData.deviceId),
    ]);
  }
}
