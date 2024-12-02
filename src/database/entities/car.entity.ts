import { Column, Entity, Index, ManyToOne, OneToMany } from 'typeorm';

import { AdvertisementEntity } from './advertisement.entity';
import { BrandEntity } from './brand.entity';
import { DealerEntity } from './dealer.entity';
import { TableNameEnum } from './enums/table-name.enum';
import { CreateUpdateModel } from './models/create-update.model';

@Entity(TableNameEnum.CAR)
export class CarEntity extends CreateUpdateModel {
  @Index()
  @Column()
  name: string;

  @ManyToOne(() => BrandEntity, (brand) => brand.models, {
    onDelete: 'CASCADE',
  })
  brand: BrandEntity;

  @OneToMany(() => AdvertisementEntity, (ads) => ads.model, { nullable: true })
  ads?: AdvertisementEntity[];

  @ManyToOne(() => DealerEntity, (dealer) => dealer.cars, { nullable: true })
  dealer?: DealerEntity;
}
