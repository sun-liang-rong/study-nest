import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { TypeOrmModule } from "@nestjs/typeorm";
import { User } from "../entities/user.entity";
import { Permissions } from 'src/entities/permissions.entity';
@Module({
  imports : [TypeOrmModule.forFeature([User, Permissions])],
  controllers: [UserController],
  providers: [UserService]
})
export class UserModule {}