import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
} from 'typeorm';

import { AdvertisementEntity } from './advertisement.entity';
import { CarEntity } from './car.entity';
import { DealerEntity } from './dealer.entity';
import { UserAccountTypeEnum } from './enums/account.enum';
import { UserRoleEnum } from './enums/role.enum';
import { TableNameEnum } from './enums/table-name.enum';
import { CreateUpdateModel } from './models/create-update.model';
import { RefreshTokenEntity } from './refresh-token.entity';

@Entity(TableNameEnum.USERS)
export class UserEntity extends CreateUpdateModel {
  @Column('text')
  name: string;

  @Column('text', { unique: true })
  email: string;

  @Column('text', { select: false })
  password: string;

  @Column('text', { nullable: true })
  phone?: string;

  @Column('text', { nullable: true })
  image?: string;

  @Column('boolean', { default: false })
  isBanned: boolean;

  @Column({
    type: 'enum',
    enum: UserAccountTypeEnum,
    default: UserAccountTypeEnum.BASIC,
  })
  accountType: UserAccountTypeEnum;

  @Column({ nullable: true })
  role: UserRoleEnum | null;

  @OneToMany(() => RefreshTokenEntity, (entity) => entity.user)
  refreshTokens?: RefreshTokenEntity[];

  @ManyToOne(() => DealerEntity, (dealer) => dealer.employees, {
    nullable: true,
  })
  dealer: DealerEntity | null;

  @OneToMany(() => AdvertisementEntity, (ads) => ads.user, {
    nullable: true,
  })
  ads?: AdvertisementEntity[];
}
