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
    @InjectRepository(Permissions)
    private permissionsRepository: Repository<Permissions>,
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
    const permissions = await this.permissionsRepository
      .createQueryBuilder()
      .getMany();
    return {
      codeStatus: 200,
      message: '查询成功',
      data: permissions,
    };
  }
  async addRole(body) {
    console.log(body);
    const { name, description } = body;
    const permissions = await this.permissionsRepository
      .createQueryBuilder()
      .insert()
      .into(Permissions)
      .values({
        name,
        description,
      })
      .execute();
    return {
      codeStatus: 200,
      message: '添加成功',
      data: permissions,
    };
  }
  async getUserList() {
    const user = await this.userRepository.find({
      relations: ['permissionss'],
    });
    return {
      codeStatus: 200,
      message: '查询成功',
      data: user,
    };
  }
  async getAllRole() {
    const role = await this.permissionsRepository.find();
    return {
      codeStatus: 200,
      message: '查询成功',
      data: role,
    };
  }
  async addUserRole(body) {
    console.log(body);
    const { roleList, userId } = body;
    const userPermissionIds = await this.userRepository.findOne({ where: {id: userId}, relations: ['permissionss'] });

    // 获取关联的 Permissions 的 ID 集合
    const permissionIds = userPermissionIds.permissionss.map(permission => permission.id);
    console.log(permissionIds);
    // 先删除关联数据
    await this.userRepository.createQueryBuilder().relation(User, 'permissionss').of(userId).remove(permissionIds);
    // 添加新的关联数据
    const user = await this.userRepository
      .createQueryBuilder()
      .relation(User, 'permissionss')
      .of(userId)
      .add(roleList);
    return {
      codeStatus: 200,
      message: '添加成功',
      data: user,
    };
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
