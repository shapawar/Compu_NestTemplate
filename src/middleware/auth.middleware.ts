
/**
 * Nest and Third party imports
 */
import { NestMiddleware, HttpStatus, Injectable, HttpException, MiddlewareFunction } from '@nestjs/common';
import * as jwt from 'jsonwebtoken';



/* 
* JWT Authentication middleware
*/
@Injectable()

export class AuthMiddleware implements NestMiddleware {

  /*
  * Verify token if token unauthorized throw error msg otherwise continue. 
   */
  resolve(...args: any[]): MiddlewareFunction {
    return async (req, res, next) => {

      try {

        const token = req.headers.authorization;

        if (token) {

          try {
            /* verify token method */
            let check = await jwt.verify(token, process.env.JWTSECRET);
            req.check = check;
            next();

          } catch (error) {

            //add error logs here 
            next(error);
          }

        } else {

          next({ message: "Auth token missing", name: "JWT Token error" });

        }

      } catch (error) {
        //add error logs here 
        next(error);
      }
    }
  }
};
