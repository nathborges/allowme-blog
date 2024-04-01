import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { DatabaseModule } from './database/database.module';
import { PostModule } from './Posts/posts.module';
import { UsersModule } from './Users/users.module';
import { AuthMiddleware } from './auth/auth.middleware';

@Module({
  imports: [DatabaseModule, PostModule, UsersModule],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthMiddleware).forRoutes('*');
  }
}
