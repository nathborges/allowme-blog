import { Module } from '@nestjs/common';
import { PostsService } from './posts.service';
import { PostsController } from './posts.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Post } from './entity/post.entity';
import { UsersModule } from 'src/Users/users.module';
import { PostsInitializationService } from './posts.initialization.service';

@Module({
  imports: [TypeOrmModule.forFeature([Post]), UsersModule],
  controllers: [PostsController],
  providers: [PostsService, PostsInitializationService],
  exports: [PostsService],
})
export class PostsModule {}
