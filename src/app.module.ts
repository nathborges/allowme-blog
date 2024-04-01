import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { DatabaseModule } from './database/database.module';
import { PostsModule } from './Posts/posts.module';
import { UsersModule } from './Users/users.module';
import { AuthMiddleware } from './auth/auth.middleware';

@Module({
  imports: [DatabaseModule, UsersModule, PostsModule],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthMiddleware).forRoutes('*');
  }
}
