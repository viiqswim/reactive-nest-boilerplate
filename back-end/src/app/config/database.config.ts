import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';

import {
  User,
  Profile,
} from '../../entity';

/**
 * Database configuration
 */
export const DatabaseConfig = TypeOrmModule.forRootAsync({
  imports: [ConfigModule],
  inject: [ConfigService],
  useFactory: (configService: ConfigService) => {
    return {
      type: 'postgres',
      host: configService.get('DATABASE_HOST'),
      port: Number(configService.get('DATABASE_PORT')),
      username: configService.get('DATABASE_USERNAME'),
      password: configService.get('DATABASE_PASSWORD'),
      database: configService.get('DATABASE_DATABASE'),
      synchronize: true,
      logging: true,
      entities: [
        User,
        Profile,
      ],
    }
  },
});
