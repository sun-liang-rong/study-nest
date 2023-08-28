import { Controller, Get, Req, Headers, HttpCode, Param, UseGuards, SetMetadata, Post, Body } from '@nestjs/common';
import { AppService } from './app.service';
import { Request } from 'express';
import { RolesGuard } from './common/rolesGuard/roles.guard';
import { Roles } from './common/rolesGuard/roles.decorator';
@Controller() 
export class AppController {
  constructor(private readonly appService: AppService) {}
  @Roles('roles')
  @UseGuards(RolesGuard)
  @Get()
  // getHello(@Req() request: Request): string {
  //   console.log(request.headers.cookie)
  //   return this.appService.getHello();
  // }
  getHello(@Headers() headers): string {
    console.log(headers.cookie)
    return this.appService.getHello();
  }
}
