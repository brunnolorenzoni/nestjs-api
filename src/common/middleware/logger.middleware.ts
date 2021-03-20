import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    console.log(
      '\n --------------------------------------- LOG GLOBAL --------------------------------------- \n',
    );
    console.log(`${req.method}: ${req.originalUrl}`);
    switch (req.method) {
      case 'POST':
        console.log(`Body: ${JSON.stringify(req.body)}`);
        break;
      case 'GET':
        console.log(
          `${Object.keys(req.params).length ? `Params: ${req.params}` : ''}`,
        );
        break;
      case 'PUT':
        console.log(`Body: ${JSON.stringify(req.body)}`);
        break;
      case 'PATCH':
        console.log(`Body: ${JSON.stringify(req.body)}`);
        break;
      case 'DELETE':
        console.log(
          `${Object.keys(req.params).length ? `Params: ${req.params}` : ''}`,
        );
        break;
    }
    console.log(
      '\n --------------------------------------- LOG GLOBAL --------------------------------------- \n',
    );
    next();
  }
}
