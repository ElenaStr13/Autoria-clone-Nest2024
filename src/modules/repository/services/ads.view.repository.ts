import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';

import { AdsViewEntity } from '../../../database/entities/ads.views.entity';

@Injectable()
export class AdViewRepository extends Repository<AdsViewEntity> {
  constructor(private readonly dataSource: DataSource) {
    super(AdsViewEntity, dataSource.manager);
  }
}
