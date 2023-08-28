import { Injectable, ExecutionContext, CanActivate } from '@nestjs/common'
import { Observable } from 'rxjs'
import { Reflector } from '@nestjs/core'
@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}
  canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
    const roles = this.reflector.get<string[]>('roles', context.getHandler())
    if(!roles) {
      return true
    }
    console.log('RolesGuard', roles)
    // console.log(context.switchToHttp().getRequest())
    // return true
    const request = context.switchToHttp().getRequest();
    const user = request.user;
    if(!user) {
      return false
    }
    console.log(user, 'user')
    return matchRoles(roles, user.roles)
  }
}
const matchRoles = (roles: string[], userRoles: string[]) => {
  return roles.some(role => userRoles.includes(role))
}
