import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

//import { UserID } from '../../../common/types/entity-ids.type';
import { Config, JwtConfig } from '../../../configs/config.type';
//import { UserRoleEnum } from '../../../database/entities/enums/role.enum';
import { RedisService } from '../../redis/redis.service';

@Injectable()
export class AuthCacheService {
  private jwtConfig: JwtConfig;

  constructor(
    private readonly redisService: RedisService,
    private readonly configService: ConfigService<Config>,
  ) {
    this.jwtConfig = this.configService.get('jwt');
  }

  public async saveToken(
    token: string,
    userId: string,
    deviceId: string,
  ): Promise<void> {
    const key = this.getKey(userId, deviceId); // Ключ може включати deviceId для унікальності токену

    await this.redisService.deleteByKey(key); // Видаляємо старий токен
    await this.redisService.addOneToSet(key, token); // Додаємо новий токен
    await this.redisService.expire(key, this.jwtConfig.accessExpiresIn); // Встановлюємо час життя токена
  }

  public async isAccessTokenExist(
    userId: string,
    deviceId: string,
    token: string,
  ): Promise<boolean> {
    const key = this.getKey(userId, deviceId);
    const set = await this.redisService.sMembers(key);
    return set.includes(token);
  }

  public async deleteToken(userId: string, deviceId: string): Promise<void> {
    const key = this.getKey(userId, deviceId);
    await this.redisService.deleteByKey(key);
  }

  private getKey(userId: string, deviceId: string) {
    return `ACCESS_TOKEN:${userId}:${deviceId}`;
  }
}
