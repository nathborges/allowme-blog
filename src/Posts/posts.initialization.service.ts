import {
  Injectable,
  InternalServerErrorException,
  Logger,
  OnModuleInit,
} from '@nestjs/common';
import { PostsService } from './posts.service';
import { AppEnv, getConfig } from '../config';

@Injectable()
export class PostsInitializationService implements OnModuleInit {
  constructor(private readonly postsService: PostsService) {}

  async onModuleInit() {
    if (getConfig().env == AppEnv.PROD) {
      Logger.warn(
        `Post seeding service will not run -  ENV: ${getConfig().env}`,
      );
      return;
    }

    if (getConfig().activeSeeders === 'false' || !process.env.ACTIVE_SEEDERS) {
      Logger.warn(
        `Post seeding service will not run -  ACTIVE_SEEDERS: ${getConfig()}`,
      );
      return;
    }

    try {
      await this.postsService.seeder();
    } catch (error) {
      throw new InternalServerErrorException('Failed to seed posts:', error);
    }
  }
}
