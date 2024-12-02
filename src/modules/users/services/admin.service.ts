import { forwardRef, Inject, Injectable } from '@nestjs/common';

import { UserRoleEnum } from '../../../database/entities/enums/role.enum';
import { SignUpManagerReqDto } from '../../auth/models/dto/req/sign-up.req.dto';
import { AuthResDto } from '../../auth/models/dto/res/auth.res.dto';
import { AuthService } from '../../auth/services/auth.service';
import { UserRepository } from '../../repository/services/user.repository';

@Injectable()
export class AdminService {
  constructor(
    private readonly userRepository: UserRepository,
    @Inject(forwardRef(() => AuthService))
    private readonly authService: AuthService,
  ) {}

  public async createManager(dto: SignUpManagerReqDto): Promise<AuthResDto> {
    return await this.authService.SignUp({
      ...dto,
      role: UserRoleEnum.MANAGER,
    });
  }
}
