import { HttpException, Injectable } from '@nestjs/common';
import { CatsService } from './cats/cats.service';
@Injectable()
export class AppService {
  constructor(private readonly catsService: CatsService) {}
  getHello(): any {
    console.log(this.catsService.create({
      name: 'Cat',
      age: 5,
      breed: 'Breed',
    }))
    // return 'Hello World!';
    return {
      data: [1,23,34],
      statusCode: 200,
      messages: 'Hello World!',
    }
   
  }
  addRole(body){
    console.log(body)
    return 123
  }
}
