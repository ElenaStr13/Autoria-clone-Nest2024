import { forwardRef, Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { JwtModule } from '@nestjs/jwt';

import { FileStorageModule } from '../file-storage/file-storage.module';
import { RedisModule } from '../redis/redis.module';
import { AdminService } from '../users/services/admin.service';
import { UsersService } from '../users/services/users.service';
import { UsersModule } from '../users/users.module';
import { AuthController } from './auth.controller';
import { JwtAccessGuard } from './guards/jwt-access.guard';
import { JwtRefreshGuard } from './guards/jwt-refresh.guard';
import { AuthService } from './services/auth.service';
import { AuthCacheService } from './services/auth-cache-service';
import { TokenService } from './services/token.service';

@Module({
  imports: [
    RedisModule,
    JwtModule,
    forwardRef(() => UsersModule),
    FileStorageModule,
  ],
  controllers: [AuthController],
  providers: [
    {
      provide: APP_GUARD,
      useClass: JwtAccessGuard,
    },
    JwtRefreshGuard,
    AuthService,
    AuthCacheService,
    UsersService,
    TokenService,
    AdminService,
  ],
  exports: [TokenService, AuthCacheService, AdminService, AuthService],
})
export class AuthModule {}
