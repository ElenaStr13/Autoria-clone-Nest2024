import { forwardRef, Module } from '@nestjs/common';

import { AuthModule } from '../auth/auth.module';
import { FileStorageModule } from '../file-storage/file-storage.module';
import { ManagerController } from './manager.controller';
import { AdminService } from './services/admin.service';
import { ManagerService } from './services/manager.service';
import { UsersService } from './services/users.service';
import { UsersController } from './users.controller';

@Module({
  imports: [forwardRef(() => AuthModule), FileStorageModule],
  controllers: [UsersController, ManagerController],
  providers: [UsersService, AdminService, ManagerService],
  exports: [UsersService, ManagerService],
})
export class UsersModule {}
