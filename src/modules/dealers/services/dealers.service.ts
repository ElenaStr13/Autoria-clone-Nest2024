import { Injectable } from '@nestjs/common';

import { DealerRepository } from '../../repository/services/dealer.repository';
import { DealerReqDto } from '../models/dto/req/dealer.req.dto';
import { DealerResDto } from '../models/dto/res/dealer.res.dto';

@Injectable()
export class DealerService {
  constructor(private readonly dealerRepository: DealerRepository) {}

  public async createDealer(dto: DealerReqDto): Promise<DealerResDto> {
    const dealership = this.dealerRepository.create(dto);
    return await this.dealerRepository.save(dealership);
  }

  public async getDealers(): Promise<DealerResDto[]> {
    return await this.dealerRepository.find();
  }

  public async getDealerById(id: string): Promise<DealerResDto> {
    return await this.dealerRepository.findOneBy({ id });
  }

  public async deleteDealership(id: string): Promise<void> {
    await this.dealerRepository.delete(id);
  }
}
