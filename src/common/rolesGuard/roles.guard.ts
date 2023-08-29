import { Injectable, ExecutionContext, CanActivate, UnauthorizedException, ForbiddenException } from '@nestjs/common'
import { Observable } from 'rxjs'
import { Reflector } from '@nestjs/core'
import { UserService } from 'src/user/user.service';
@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private readonly reflector: Reflector, private userService: UserService) {}
  canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
    const roles = this.reflector.get<string[]>('roles', context.getHandler())
    if(!roles) {
      return true
    }
    const request = context.switchToHttp().getRequest();
    const user = request.user;
    if(!user) {
      return false
    }
    const flag = this.getUserRoles(user.username).then(res => {
      let userList = []
      res.permissionss.forEach(item => {
        userList.push(item.name)
      })
      let flag = matchRoles(roles, userList)
      if(!flag){
        throw new ForbiddenException('您没有没有权限', '403')
      }else {
        return true
      }
    })
    return flag
  }
  async getUserRoles(username: string) {
    return await this.userService.getUserRoles(username)
  }
}
const matchRoles = (roles: string[], userRoles: string[]) => {
  return roles.some(role => userRoles.includes(role))
}
