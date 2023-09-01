import { Inject, Injectable } from '@nestjs/common';
import { CreateCacheDto } from './dto/create-cache.dto';
import { UpdateCacheDto } from './dto/update-cache.dto';
import { RedisClientType } from 'redis'
@Injectable()
export class CacheService {
  constructor(@Inject('REDIS_CLIENT') private redisClient: RedisClientType){}
  //获取值
  async get(key) {
    let value = await this.redisClient.get(key);
    try {
      value = JSON.parse(value);
    } catch (error) {}
    return value;
  }
  /**
   * 设置值
   * @param key {string} key
   * @param value 值
   * @param second 过期时间 秒
   * @returns Promise<any>
   */
  async set(key: string, value: any, second?: number) {
    value = JSON.stringify(value);
    return await this.redisClient.set(key, value, { EX: second });
  }
  //删除值
  async del(key: string) {
    return await this.redisClient.del(key);
  }
  //清除缓存
  async flushall() {
    return await this.redisClient.flushAll();
  }
  //添加成员集合
  async sadd(key: string, value: any) {
    value = JSON.stringify(value)
    return await this.redisClient.sAdd(key, value);
  }
  //获取成员集合
  async scard(key: string) {
    return await this.redisClient.sCard(key);
  }
  //获取集合里面的值
  async smembers(key: string) {
    return await this.redisClient.sMembers(key);
  }
  // 查询随机一项的值
  async srandmember(key: string) {
    return await this.redisClient.sRandMember(key);
  }
}
