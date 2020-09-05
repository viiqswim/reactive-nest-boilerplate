import { ConfigModule } from '@nestjs/config';

/**
 * .env configuration
 */
export const DotEnvConfig = ConfigModule.forRoot({
  // specify the .env files you want to use in the order of importance from left to right
  envFilePath: ['./env/.env', './env/.env.development'],
  // use 'ignoreEnvFile' if you wish to ignore the .env file and instead use hard-coded values
  ignoreEnvFile: false,
  // allow the app to use all of the .env values globally
  isGlobal: true,
});
