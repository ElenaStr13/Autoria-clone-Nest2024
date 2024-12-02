import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import configuration from './configs/configuration';
import { AdsModule } from './modules/advertisements/ads.module';
import { AuthModule } from './modules/auth/auth.module';
import { CarsModule } from './modules/cars/cars.module';
import { DealersModule } from './modules/dealers/dealers.module';
import { PostgresModule } from './modules/postgres/postgres.module';
import { RedisModule } from './modules/redis/redis.module';
import { RepositoryModule } from './modules/repository/repository.module';
import { UsersModule } from './modules/users/users.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [configuration],
      isGlobal: true,
    }),
    AuthModule,
    RepositoryModule,
    PostgresModule,
    RedisModule,
    AdsModule,
    UsersModule,
    CarsModule,
    DealersModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
