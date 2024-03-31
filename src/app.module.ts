import { Module } from '@nestjs/common';
import { DatabaseModule } from './database/database.module';
import { PostModule } from './Posts/posts.module';
import { UsersModule } from './Users/users.module';

@Module({
  imports: [DatabaseModule, PostModule, UsersModule],
})
export class AppModule {}
