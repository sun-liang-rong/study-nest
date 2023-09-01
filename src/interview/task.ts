import { Injectable } from "@nestjs/common";
import { Cron } from "@nestjs/schedule";
import { Interview } from 'src/entities/interview.entity'
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { CacheService } from 'src/cache/cache.service';
import { InterviewService } from "./interview.service";
@Injectable()
export class MyTask {
  constructor(@InjectRepository(Interview) private readonly interviewRepository: Repository<Interview>, 
  private readonly cacheService: CacheService,
  private readonly interviewService: InterviewService
  ){}
  // 分别代表 秒 分 时 日 月 周几
  @Cron('0 * * * * *')
  async handlerCron() {
    console.log('每分钟执的第零秒行一次');
    const dayContent = await this.cacheService.smembers('s_view_day:id' + this.interviewService.getCurrentDate())
    const allContent = await this.cacheService.smembers('s_view_all:')
    // await this.interviewRepository
    // const allInterView = await this.cacheService.scard('s_view_all');
    // const dayInterView = await this.cacheService.scard('s_view_day:id' + this.interviewService.getCurrentDate());
    // const data  = await this.interviewRepository.createQueryBuilder('interview').insert().into(Interview).values({
    //   allInterview: String(allInterView),
    //   dayInterview: String(dayInterView),
    //   timeDate: this.getPreviousDate()
    // }).execute()
    console.log( '同步数据库任务成功', dayContent, allContent)
  }

  getPreviousDate() {
    const today = new Date();
    const previousDate = new Date(today);
    previousDate.setDate(today.getDate() - 1);
  
    const year = previousDate.getFullYear();
    const month = String(previousDate.getMonth() + 1).padStart(2, '0');
    const day = String(previousDate.getDate()).padStart(2, '0');
  
    return `${year}-${month}-${day}`;
  }
}