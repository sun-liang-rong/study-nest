import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto, LoginDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('login')
  create(@Body() loginDto: LoginDto) {
    console.log(loginDto);
    return this.userService.create(loginDto);
  }
  @Post('getRole')
  getRole(@Body() body) {
    console.log(body);
    return this.userService.getRole(body);
  }
  @Post('addRole')
  addRole(@Body() body) {
    console.log(body);
    return this.userService.addRole(body);
  }
  @Post('userList') 
  getUserList(){
    return this.userService.getUserList()
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
    return this.userService.update(+id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userService.remove(+id);
  }
}
