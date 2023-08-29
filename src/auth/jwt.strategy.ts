import { Cache } from './../cache/entities/cache.entity';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { CacheService } from 'src/cache/cache.service';
@Injectable()
// PassportStrategy 是一个抽象类，它的作用是定义一个策略，这个策略将会被 passport 使用。
// 我们需要继承这个类，并且实现 validate 方法。
// 这个方法的作用是当请求进来后，passport 将会调用 validate 方法，我们可以在这个方法中提取出请求中的 token，
// 然后验证 token 的有效性，如果有效，我们可以返回一个用户对象，这个对象将会被注入到请求中，我们可以在请求中使用这个对象。
export class JwtStrategy extends PassportStrategy(Strategy) {
  private unverifiedJwt: string;
  constructor(private cacheService: CacheService) {
    super({
      // jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      jwtFromRequest: (req) => {
        var token = ExtractJwt.fromAuthHeaderWithScheme('Bearer')(req);
        this.unverifiedJwt = token;
        console.log(token, 'token')
        return token;
      },
      ignoreExpiration: false,
      secretOrKey: process.env.secret,
    });
    console.log('JwtStrategy', process.env.secret);
  }
  async validate(payload: any, req: any) {
    console.log('JwtStrategy', payload);
    //有refreshToken说明是刷新token
    let cacheJwt
    if(payload.refreshToken){
      cacheJwt = await this.cacheService.get(payload.sub + payload.username + true)
    }else {
      cacheJwt = await this.cacheService.get(payload.sub + payload.username)
    }
    console.log(this.unverifiedJwt); // 打印未解密的 JWT
    console.log(cacheJwt)
    if(this.unverifiedJwt !== cacheJwt) {
      throw new UnauthorizedException('你的账号在其他地方登录', '401');
    }
    return { id: payload.sub, username: payload.username };
  }
}
