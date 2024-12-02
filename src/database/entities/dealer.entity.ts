import { Column, Entity, ManyToOne, OneToMany } from 'typeorm';

import { CarEntity } from './car.entity';
import { TableNameEnum } from './enums/table-name.enum';
import { CreateUpdateModel } from './models/create-update.model';
import { UserEntity } from './user.entity';

@Entity(TableNameEnum.DEALERS)
export class DealerEntity extends CreateUpdateModel {
  @Column()
  name: string;

  // @Column()
  // address: string;
  //
  // @Column()
  // contact: string;

  @ManyToOne(() => UserEntity, (user) => user.dealer)
  createdDealer: UserEntity;

  @OneToMany(() => UserEntity, (user) => user.dealer)
  employees: UserEntity[];

  @OneToMany(() => CarEntity, (car) => car.dealer)
  cars: CarEntity[];
}
