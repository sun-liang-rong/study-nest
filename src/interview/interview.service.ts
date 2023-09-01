import { Injectable } from '@nestjs/common';
import { CreateInterviewDto } from './dto/create-interview.dto';
import { UpdateInterviewDto } from './dto/update-interview.dto';
import { CacheService } from 'src/cache/cache.service';
@Injectable()
export class InterviewService {
  constructor(private readonly cacheService: CacheService) {}
  async getOneDay() {
    let currentDay = this.getCurrentDate()
    const data = await  this.cacheService.scard('s_view_day:id' + currentDay);
    return {
      codeStatus: 200,
      message: '获取成功',
      data: {
        time: currentDay,
        count: data,
      }
    }
  }

  async getAllDay() {
    const data = await  this.cacheService.scard('s_view_all:id');
    return {
      codeStatus: 200,
      message: '获取成功',
      data: {
        count: data,
      }
    }
  }
  //添加访问量
  async addInterview(user) {
    // this.cacheService.sadd('interview', user);
    console.log(this.getCurrentDate(), user)
    let currentDay = this.getCurrentDate()
    //2.添加总访问量
    const result = await this.cacheService.sadd('s_view_all:id', user.id + ":" + currentDay);
    //1.添加当日访问量
    const result2 = await this.cacheService.sadd('s_view_day:id' + currentDay, String(user.id));
    return {
      codeStatus: 200,
      message: '添加成功',
      data: {
        result,
        result2,
      },
    }
  }
  getCurrentDate() {
    let nowDate = new Date();
    let year = nowDate.getFullYear();
    let month: number | string = nowDate.getMonth() + 1;
    let day: number | string = nowDate.getDate();
    if (month >= 1 && month <= 9) {
      month = '0' + month;
    }
    if (day >= 0 && day <= 9) {
      day = '0' + day;
    }
    console.log(year + '' + month + '' + day);
    return year + '' + month + '' + day;
  }
}
