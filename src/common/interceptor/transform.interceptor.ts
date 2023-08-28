import { Injectable, NestInterceptor, ExecutionContext, CallHandler} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class TransformInterceptor<T> implements NestInterceptor<T, any> {
  intercept(context: ExecutionContext, next: CallHandler<T>): Observable<any> {
    console.log('TransformInterceptor')
    // console.log(context.switchToHttp().getResponse())
    return next.handle().pipe(map(data => {
      return data}))
  }
}