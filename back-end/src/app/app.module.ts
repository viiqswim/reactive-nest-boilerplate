import { Module } from '@nestjs/common';

import { DatabaseConfig } from './config/database.config';
import { DotEnvConfig } from './config/dotEnv.config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from '../users/users.module';

@Module({
  imports: [
    UsersModule,
    DotEnvConfig,
    DatabaseConfig,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
