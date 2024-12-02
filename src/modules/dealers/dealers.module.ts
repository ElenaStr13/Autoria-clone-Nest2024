import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { DealerEntity } from '../../database/entities/dealer.entity';
import { DealersController } from './dealers.controller';
import { DealerService } from './services/dealers.service';

@Module({
  imports: [TypeOrmModule.forFeature([DealerEntity])],
  controllers: [DealersController],
  providers: [DealerService],
  exports: [DealerService],
})
export class DealersModule {}
