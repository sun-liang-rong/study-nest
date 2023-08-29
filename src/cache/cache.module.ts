import { Module } from '@nestjs/common';
import { CacheService } from './cache.service';
import { CacheController } from './cache.controller';
import { createClient } from 'redis'
@Module({
  imports: [],
  controllers: [CacheController],
  providers: [CacheService,
    {
      provide: 'REDIS_CLIENT',
      async useFactory() {
        const client = createClient({
          socket: {
            host: process.env.REDIS_HOST,
            port: parseInt(process.env.REDIS_PORT),
          },
        });
        await client.connect();
        return client;
      },
    },
  ],
  exports: [CacheService]
})
export class CacheModule {}
