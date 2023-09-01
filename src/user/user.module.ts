import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { TypeOrmModule } from "@nestjs/typeorm";
import { User } from "../entities/user.entity";
import { Permissions } from 'src/entities/permissions.entity';
import { JwtStrategy } from 'src/auth/jwt.strategy';
import { CacheModule } from 'src/cache/cache.module';
import { ScheduleModule } from '@nestjs/schedule';
@Module({
  imports : [TypeOrmModule.forFeature([User, Permissions]), CacheModule, ScheduleModule.forRoot()],
  controllers: [UserController],
  providers: [UserService, JwtStrategy],
  exports: [UserService]
})
export class UserModule {}
