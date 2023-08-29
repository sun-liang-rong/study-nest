import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto, LoginDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { AuthGuard } from '@nestjs/passport';
import { Roles } from 'src/common/rolesGuard/roles.decorator';
import { RolesGuard } from 'src/common/rolesGuard/roles.guard';
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('login')
  create(@Body() loginDto: LoginDto) {
    console.log(loginDto);
    return this.userService.create(loginDto);
  }
  @UseGuards(AuthGuard('jwt'))
  @Post('getRole')
  getRole(@Body() body) {
    console.log(body);
    return this.userService.getRole(body);
  }
  // @UseGuards(AuthGuard('jwt'),RolesGuard)
  @Roles('超级管理员')
  @Post('addRole')
  addRole(@Body() body) {
    console.log(body);
    return this.userService.addRole(body);
  }
  @UseGuards(AuthGuard('jwt'))
  @Post('userList') 
  getUserList(){
    return this.userService.getUserList()
  }
  @UseGuards(AuthGuard('jwt'))
  @Post('getAllRole')
  getAllRole(){
    return this.userService.getAllRole()
  }
  // @UseGuards(AuthGuard('jwt'),RolesGuard)
  @Roles('超级管理员')
  @Post('addUserRole')
  addUserRole(@Body() body){
    return this.userService.addUserRole(body)
  }
  // @UseGuards(AuthGuard('jwt'),RolesGuard)
  @Roles('超级管理员')
  @Post('addUser')
  addUser(@Body() body){
    return this.userService.addUser(body)
  }
  @Get()
  findAll() {
    return this.userService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    // return this.userService.update(+id, updateUserDto);
    return 123
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userService.remove(+id);
  }
}
