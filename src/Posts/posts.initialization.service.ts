import {
  Injectable,
  InternalServerErrorException,
  OnModuleInit,
} from '@nestjs/common';
import { PostsService } from './posts.service';

@Injectable()
export class PostsInitializationService implements OnModuleInit {
  constructor(private readonly postsService: PostsService) {}

  async onModuleInit() {
    if (process.env.ACTIVE_SEEDERS === 'false' || !process.env.ACTIVE_SEEDERS) {
      return;
    }

    try {
      await this.postsService.seeder();
    } catch (error) {
      throw new InternalServerErrorException('Failed to seed posts:', error);
    }
  }
}
