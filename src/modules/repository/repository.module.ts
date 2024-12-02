import { Global, Module } from '@nestjs/common';

import { AdsRepository } from './services/advisement.repository';
import { BrandRepository } from './services/brand.repository';
import { CarRepository } from './services/car.repository';
import { DealerRepository } from './services/dealer.repository';
import { RefreshTokenRepository } from './services/refresh-token.repository';
import { UserRepository } from './services/user.repository';

const repositories = [
  BrandRepository,
  CarRepository,
  DealerRepository,
  AdsRepository,
  RefreshTokenRepository,
  UserRepository,
];

@Global()
@Module({
  providers: [...repositories],
  exports: [...repositories],
})
export class RepositoryModule {}
