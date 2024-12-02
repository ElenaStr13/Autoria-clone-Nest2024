import {
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { AdvertisementEntity } from './advertisement.entity';
import { TableNameEnum } from './enums/table-name.enum';

@Entity(TableNameEnum.ADS_VIEWS)
export class AdsViewEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => AdvertisementEntity, (ads) => ads.views)
  ads: AdvertisementEntity;

  @CreateDateColumn()
  viewDate: Date;
}
