import { Column, Entity, Index, JoinColumn, ManyToOne } from 'typeorm';

import { UserID } from '../../common/types/entity-ids.type';
import { TableNameEnum } from './enums/table-name.enum';
import { CreateUpdateModel } from './models/create-update.model';
import { UserEntity } from './user.entity';

@Entity(TableNameEnum.REFRESH_TOKENS)
export class RefreshTokenEntity extends CreateUpdateModel {
  @Column('text')
  refreshToken: string;

  @Column({ type: 'varchar', nullable: true })
  @Index()
  @Column('text')
  deviceId?: string | null;

  @Column()
  user_id: UserID;
  @ManyToOne(() => UserEntity, (entity) => entity.refreshTokens)
  @JoinColumn({ name: 'user_id' })
  user?: UserEntity;
}
