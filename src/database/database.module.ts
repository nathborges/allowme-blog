import { Module, Logger } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { getConfig } from '../config';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useFactory: async () => {
        const logger = new Logger('DatabaseModule');
        try {
          const {
            database: { host, port, password, user, dbName },
          } = getConfig();

          return {
            type: 'postgres',
            host,
            port,
            username: user,
            password,
            database: dbName,
            synchronize: true,
            entities: [__dirname + '/../**/*.entity.js'],
          };
        } catch (error) {
          logger.error(`Failed to connect to database: ${error.message}`);
          throw error;
        }
      },
    }),
  ],
})
export class DatabaseModule {}
