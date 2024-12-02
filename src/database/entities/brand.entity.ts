import { Column, Entity, OneToMany } from 'typeorm';

import { CarEntity } from './car.entity';
import { TableNameEnum } from './enums/table-name.enum';
import { CreateUpdateModel } from './models/create-update.model';

@Entity(TableNameEnum.BRAND)
export class BrandEntity extends CreateUpdateModel {
  @Column()
  name: string;

  @OneToMany(() => CarEntity, (model) => model.brand, { nullable: true })
  models?: CarEntity[];
}
