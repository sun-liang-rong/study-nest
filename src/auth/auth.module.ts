import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UserModule } from 'src/user/user.module';
import { JwtModule } from '@nestjs/jwt'
import { LocalStrategy } from './local.strategy';
import { JwtStrategy } from './jwt.strategy';
import { CacheModule } from 'src/cache/cache.module';
@Module({
  imports: [UserModule, CacheModule,
    JwtModule.register({
      global: true,
      secret: process.env.secret,
      signOptions: { expiresIn: '1h' },
    }),],
  controllers: [AuthController],
  providers: [AuthService, LocalStrategy, JwtStrategy],
  exports: [AuthService, LocalStrategy, JwtStrategy]
})
export class AuthModule {}
