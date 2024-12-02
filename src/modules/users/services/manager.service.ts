import {
  forwardRef,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import { UserAccountTypeEnum } from '../../../database/entities/enums/account.enum';
import { UserEntity } from '../../../database/entities/user.entity';
import { IUserData } from '../../auth/models/interfaces/user-data.interface';
import { AuthService } from '../../auth/services/auth.service';
import { UserRepository } from '../../repository/services/user.repository';

@Injectable()
export class ManagerService {
  constructor(
    private readonly userRepository: UserRepository,
    @Inject(forwardRef(() => AuthService))
    private readonly authService: AuthService,
  ) {}

  public async updateAccountType(
    userId: string,
    accountType: UserAccountTypeEnum,
    userData: IUserData,
  ): Promise<UserEntity> {
    const user = await this.userRepository.findOneBy({ id: userId });
    if (!user) {
      throw new NotFoundException('User not found');
    }
    if (accountType !== user.accountType) {
      user.accountType = accountType;
    }
    return await this.userRepository.save(user);
  }
  public async updateUserStatus(
    id: string,
    isBanned: boolean,
    currentUser: IUserData,
  ): Promise<UserEntity> {
    const user = await this.userRepository.findOneBy({ id });
    if (!user) {
      throw new Error('User not found');
    }
    user.isBanned = isBanned;
    return await this.userRepository.save(user);
  }
}
