import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AdvertisementEntity } from '../../database/entities/advertisement.entity';
import { FileStorageModule } from '../file-storage/file-storage.module';
import { AdViewRepository } from '../repository/services/ads.view.repository';
import { AdsRepository } from '../repository/services/advisement.repository';
import { AdsController } from './ads.controller';
import { AdsService } from './services/ads.service';

@Module({
  imports: [FileStorageModule, TypeOrmModule.forFeature([AdvertisementEntity])],
  controllers: [AdsController],
  providers: [AdsService, AdsRepository, AdViewRepository],
  exports: [AdsService],
})
export class AdsModule {}
