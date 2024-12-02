import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm';

import { AdsViewEntity } from './ads.views.entity';
import { CarEntity } from './car.entity';
import { CurrencyEnum } from './enums/currency.enum';
import { TableNameEnum } from './enums/table-name.enum';
import { CreateUpdateModel } from './models/create-update.model';
import { UserEntity } from './user.entity';

@Entity(TableNameEnum.ADS)
export class AdvertisementEntity extends CreateUpdateModel {
  @Column('text')
  title: string;

  @Column('text')
  description: string;

  @Column('decimal', { precision: 10, scale: 2 })
  price: number;

  @Column({ type: 'enum', enum: CurrencyEnum })
  currency: CurrencyEnum;

  @Column('text')
  location: string;

  @Column('text')
  condition: string;

  @Column('int')
  year: number;

  @Column({ type: 'boolean', default: true })
  isActive: boolean;

  @Column('int')
  mileage: number;

  @Column('int', { default: 0 })
  editQuantity: number;

  @ManyToOne(() => CarEntity, (model) => model.ads)
  model: CarEntity;

  @Column('simple-array', { nullable: true })
  photos?: string[];

  @ManyToOne(() => UserEntity, (user) => user.ads)
  @JoinColumn({ name: 'userId' })
  user: UserEntity;

  @OneToMany(() => AdsViewEntity, (view) => view.ads)
  views: AdsViewEntity[];
}
