import { NestMiddleware, HttpStatus, Injectable, HttpException } from '@nestjs/common';
import * as jwt from 'jsonwebtoken';
import { UsersService } from 'dist/src/users/users.service';



@Injectable()

export class AuthMiddleware implements NestMiddleware {


 
    use(req, res, next: () => void) {

      try {

        const token = req.headers.authorization;

        if (token) {
          try {
            let check =  jwt.verify(token,process.env.JWTSECRET);
            req.check = check;
            next();
          } catch (error) {
            next();
          }
        } else {
          next();
        }
      } catch (error) {
        next();
      }

    }
  
};
