import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Redis } from 'ioredis';

import { Config, RedisConfig } from '../../configs/config.type';
import { REDIS_CLIENT } from './models/redis.constants';
import { RedisService } from './redis.service';

const redisProvider = {
  provide: REDIS_CLIENT,
  useFactory: (configService: ConfigService<Config>) => {
    const redisConfig = configService.get<RedisConfig>('redis');

    return new Redis({
      host: redisConfig.host,
      port: redisConfig.port,
      password: redisConfig.password,
    });
  },
  inject: [ConfigService],
};

@Module({
  imports: [],
  controllers: [],
  providers: [redisProvider, RedisService],
  exports: [RedisService],
})
export class RedisModule {}
