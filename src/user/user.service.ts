import { Injectable } from '@nestjs/common';
import { CreateUserDto, LoginDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from '../entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Permissions } from 'src/entities/permissions.entity';
@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
    @InjectRepository(Permissions) private permissionsRepository: Repository<Permissions>
  ) {}
  async create(loginDto: LoginDto) {
    const { username, password } = loginDto;
    let user = await this.userRepository
      .createQueryBuilder()
      .addSelect('password')
      .where('username=:username', { username })
      .getOne();
    if (!user) {
      return {
        codeStatus: 400,
        message: '用户名或密码错误',
        data: null,
      };
    }
    for (let key in user) {
      user['jwtToken'] = '123456';
      if (key === 'password') {
        delete user[key];
      }
    }
    return {
      codeStatus: 200,
      message: '登录成功',
      data: user,
    };
  }
  async getRole(body) {
    console.log(body);
    const { username, password } = body;
    const permissions = await this.permissionsRepository.createQueryBuilder().getMany();
    return {
      codeStatus: 200,
      message: '查询成功',
      data: permissions,
    };
  }
  async addRole(body) {
    console.log(body);
    const { name, description } = body;
    const permissions = await this.permissionsRepository.createQueryBuilder().insert().into(Permissions).values({
      name,
      description,
    }).execute();
    return {
      codeStatus: 200,
      message: '添加成功',
      data: permissions,
    };
  }
  async getUserList(){
    const user =  await this.userRepository.find({
      relations: ['permissions']
    })
    return {
      codeStatus: 200,
      message: '查询成功',
      data: user,
    }
  }
  findAll() {
    return `This action returns all user`;
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
