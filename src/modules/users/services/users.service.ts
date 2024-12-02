import {
  ConflictException,
  Injectable,
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectEntityManager } from '@nestjs/typeorm';
import { EntityManager } from 'typeorm';

import { Config } from '../../../configs/config.type';
import { UserRoleEnum } from '../../../database/entities/enums/role.enum';
import { RefreshTokenEntity } from '../../../database/entities/refresh-token.entity';
import { UserEntity } from '../../../database/entities/user.entity';
import { IUserData } from '../../auth/models/interfaces/user-data.interface';
import { ContentType } from '../../file-storage/enums/content-type.enum';
import { FileStorageService } from '../../file-storage/services/file-storage.service';
import { RefreshTokenRepository } from '../../repository/services/refresh-token.repository';
import { UserRepository } from '../../repository/services/user.repository';
import { UpdateUserReqDto } from '../models/dto/request/update-user.req.dto';
import { UserResDto } from '../models/dto/response/user.res.dto';
import { UserMapper } from './user.mapper';

@Injectable()
export class UsersService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly configService: ConfigService<Config>,
    private readonly refreshTokenRepository: RefreshTokenRepository,
    private readonly fileStorageService: FileStorageService,
    @InjectEntityManager()
    private readonly entityManager: EntityManager,
  ) {}
  public async findMe(userData: IUserData): Promise<UserResDto> {
    return await this.entityManager.transaction(async (em: EntityManager) => {
      const userRepository = em.getRepository(UserEntity);
      try {
        const entity = await userRepository.findOneBy({
          id: userData.userId,
        });
        if (!entity) {
          // Якщо користувач не знайдений, викидаємо відповідну помилку
          throw new UnprocessableEntityException('User not found');
        }
        return UserMapper.toResDto(entity);
      } catch (error) {
        throw new UnprocessableEntityException('User not found');
      }
    });
  }

  public async updateMe(
    userData: IUserData,
    dto: UpdateUserReqDto,
  ): Promise<UserResDto> {
    return await this.entityManager.transaction(async (em: EntityManager) => {
      const userRepository = em.getRepository(UserEntity);
      try {
        const entity = await this.findByIdOrThrow(userData.userId, em);
        const user = await userRepository.save({ ...entity, ...dto });
        return UserMapper.toResDto(user);
      } catch (error) {
        throw new UnprocessableEntityException('Failed to update user data');
      }
    });
  }

  public async deleteMe(userData: IUserData): Promise<void> {
    await this.entityManager.transaction(async (em: EntityManager) => {
      const refreshTokenRepository = em.getRepository(RefreshTokenEntity);
      const userRepository = em.getRepository(UserEntity);
      try {
        const user = await this.findByIdOrThrow(userData.userId, em);
        if (!user) {
          throw new NotFoundException('User not found');
        }

        const refreshTokens = await refreshTokenRepository.find({
          where: { user: { id: userData.userId } },
        });

        await refreshTokenRepository.delete({ user: user });
        await Promise.all(
          refreshTokens.map(async (token) => {
            await refreshTokenRepository.remove(token);
          }),
        );

        await userRepository.remove(user);
      } catch (error) {
        throw new UnprocessableEntityException('Failed to delete user data');
      }
    });
  }

  public async findByIdOrThrow(
    userId: string,
    em?: EntityManager,
  ): Promise<UserEntity> {
    const userRepository = em.getRepository(UserEntity) ?? this.userRepository;
    const entity = await userRepository.findOneBy({ id: userId });
    if (!entity) {
      throw new UnprocessableEntityException();
    }
    return entity;
  }

  public async isUserExistOrThrow(email: string): Promise<UserEntity> {
    const user = await this.userRepository.findOneBy({ email });
    if (user && user.role !== UserRoleEnum.ADMIN) {
      throw new ConflictException('Email is already in use');
    }
    return user;
  }
  public async uploadAvatar(
    userData: IUserData,
    avatar: Express.Multer.File,
  ): Promise<void> {
    const image = await this.fileStorageService.uploadFile(
      avatar,
      ContentType.IMAGE,
      userData.userId,
    );
    await this.userRepository.update(userData.userId, { image });
  }

  public async deleteAvatar(userData: IUserData): Promise<void> {
    const user = await this.userRepository.findOneBy({ id: userData.userId });
    if (user.image) {
      await this.fileStorageService.deleteFile(user.image);
      await this.userRepository.save(
        this.userRepository.merge(user, { image: null }),
      );
    }
  }
}
