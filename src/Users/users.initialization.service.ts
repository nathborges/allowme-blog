import {
  Injectable,
  InternalServerErrorException,
  OnModuleInit,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { AppEnv, getConfig } from '../config';

@Injectable()
export class UsersInitializationService implements OnModuleInit {
  constructor(private readonly usersService: UsersService) {}

  async onModuleInit() {
    if (getConfig().env == AppEnv.PROD) {
      return;
    }

    if (getConfig().activeSeeders === 'false' || !process.env.ACTIVE_SEEDERS) {
      return;
    }
    try {
      await this.usersService.seeder();
    } catch (error) {
      throw new InternalServerErrorException('Failed to seed users:', error);
    }
  }
}
