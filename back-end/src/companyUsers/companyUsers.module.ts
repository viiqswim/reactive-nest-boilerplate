import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

import { Company, User } from "../entity";
import { CompanyUsersService } from "./companyUsers.service";
import { CompanyUsersController } from "./companyUsers.controller";

/**
 * The purpose if this module is to showcase the power of the NestJS CRUD package
 *
 * This package gives a controller the ability to automatically generate CRUD
 * endpoints for any given entity.
 *
 * Here is a sample of the endpoints it generates for any specified entity:
 * https://github.com/nestjsx/crud/wiki/Controllers#api-endpoints
 */
@Module({
  imports: [TypeOrmModule.forFeature([Company, User])],
  providers: [CompanyUsersService],
  exports: [CompanyUsersService],
  controllers: [CompanyUsersController],
})
export class CompanyUsersModule {}
