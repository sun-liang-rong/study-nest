import { Injectable } from '@nestjs/common';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { UserService } from 'src/user/user.service';
import { JwtService } from '@nestjs/jwt'
import { CacheService } from 'src/cache/cache.service';
@Injectable()
export class AuthService {
  constructor(private readonly userService: UserService,private jwtService: JwtService,
    private readonly cacheService: CacheService
    ) {}
  async signIn(body): Promise<any> {
    const user = await this.userService.findOne(body.username)
    if(!user){
      return {
        codeStatus: 400,
        message: '用户名或密码错误',
        data: null,
      };
    }
    if(body.password != user.password) {
      return {
        codeStatus: 400,
        message: '用户名或密码错误',
        data: null,
      };
    }
    const payload = { sub: user.id, username: user.username };
    const jwtToken = await this.jwtService.signAsync(payload)
    let cacheValue = await this.cacheService.set(user.id + user.username, jwtToken)
    console.log(cacheValue)
    return {
      codeStatus: 200,
      message: '登录成功',
      data: {
        jwtToken,
        ...user
      },
    }
  }
  async login(user: any) {
    const payload = { username: user.username, sub: user.id };
    const refreshTokenPayload = { username: user.username, sub: user.id, refreshToken: true};
    let accessToken = this.jwtService.sign(payload, {expiresIn: '10s'})
    let refreshToken = this.jwtService.sign(refreshTokenPayload, {expiresIn: '1h'})
    let cacheValue = await this.cacheService.set(user.id + user.username, accessToken)
    await this.cacheService.set(user.id + user.username + true, refreshToken)
    console.log(cacheValue)
    return {
      codeStatus: 200,
      data: {
        accessToken,
        refreshToken,
        user
      }
    };
  }
  async refreshToken(req){
    console.log(req.user, '---------refreshToken')
    const payload = { username: req.user.username, sub: req.user.id };
    let accessToken = this.jwtService.sign(payload, {expiresIn: '10s'})
    let cacheValue = await this.cacheService.set(payload.sub + payload.username, accessToken)
    console.log(cacheValue)
    return {
      codeStatus: 200,
      data: {
        accessToken,
        user: req.user
      }
    }
  }
  async validateUser(username: string, password: string): Promise<any> {
    return await this.userService.validateUser(username, password);
  }
  create(createAuthDto: CreateAuthDto) {
    return 'This action adds a new auth';
  }

  findAll() {
    return `This action returns all auth`;
  }

  findOne(id: number) {
    return `This action returns a #${id} auth`;
  }

  update(id: number, updateAuthDto: UpdateAuthDto) {
    return `This action updates a #${id} auth`;
  }

  remove(id: number) {
    return `This action removes a #${id} auth`;
  }
}
