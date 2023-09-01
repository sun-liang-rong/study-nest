import { Module } from '@nestjs/common';
import { InterviewService } from './interview.service';
import { InterviewController } from './interview.controller';
import { CacheModule } from 'src/cache/cache.module';
import { MyTask } from './task';
import { Interview } from 'src/entities/interview.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
@Module({
  //注入redis缓存模块
  imports: [CacheModule, TypeOrmModule.forFeature([Interview])],
  controllers: [InterviewController],
  providers: [InterviewService, MyTask]
})
export class InterviewModule {}
