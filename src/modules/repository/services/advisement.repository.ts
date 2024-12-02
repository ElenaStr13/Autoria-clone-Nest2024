import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';

import { AdvertisementEntity } from '../../../database/entities/advertisement.entity';

@Injectable()
export class AdsRepository extends Repository<AdvertisementEntity> {
  constructor(private readonly dataSource: DataSource) {
    super(AdvertisementEntity, dataSource.manager);
  }
}
