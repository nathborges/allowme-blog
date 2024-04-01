import {
  Injectable,
  NestMiddleware,
  UnauthorizedException,
} from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { getConfig } from 'src/config';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    const { apiKey } = getConfig();

    const givenApiKey = req.headers['x-api-key'];

    if (givenApiKey == apiKey) {
      return next();
    }

    throw new UnauthorizedException();
  }
}
