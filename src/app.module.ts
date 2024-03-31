import { Module } from '@nestjs/common';
import { DatabaseModule } from './database/database.module';
import { PostModule } from './Posts/posts.module';

@Module({
  imports: [DatabaseModule, PostModule],
})
export class AppModule {}
