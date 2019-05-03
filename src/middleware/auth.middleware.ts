import { NestMiddleware, HttpStatus, Injectable, HttpException, MiddlewareFunction } from '@nestjs/common';
import * as jwt from 'jsonwebtoken';
import { UsersService } from 'dist/src/users/users.service';



@Injectable()

export class AuthMiddleware implements NestMiddleware {


  resolve(...args: any[]): MiddlewareFunction {
    return async (req, res, next) => {

      try {

        const token = req.headers.authorization;

        if (token) {
          try {
            let check = await jwt.verify(token,process.env.JWTSECRET);
            req.check = check;
            next();
          } catch (error) {
            next(error);
          }
        } else {
          next({message:"Auth token missing", name:"JWT Token error"});
        }
      } catch (error) {
        next(error);
      }

    }
  }
};
