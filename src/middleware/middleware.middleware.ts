import { Request, Response, NextFunction } from 'express';
export function MiddlewareMiddleware(req: Request, res: Response, next: NextFunction) {
  console.log('Request...');
  next();
}
