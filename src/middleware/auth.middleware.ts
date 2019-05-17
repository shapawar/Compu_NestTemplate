
/**
 * Nest and Third party imports
 */
import { NestMiddleware, Injectable, MiddlewareFunction } from '@nestjs/common';
import * as jwt from 'jsonwebtoken';
import { LogService } from './logger.middleware';

const logger = new LogService();

/* 
* JWT Authentication middleware
*/
@Injectable()

export class AuthMiddleware implements NestMiddleware {
  MODULENAME = 'AuthMiddleware';

  /*
  * Verify token if token unauthorized throw error msg otherwise continue. 
   */
  resolve(...args: any[]): MiddlewareFunction {
    return async (req, res, next) => {

      let taskName = "JWTAuthentication";

      try {

        const token = req.headers.authorization;

        if (token) {

          try {

            logger.debug(`[${req.evUniqueID}] ${this.MODULENAME} (${taskName}): - `);
            /* verify token method */
            let check = await jwt.verify(token, process.env.JWTSECRET);
            req.check = check;
            next();

          } catch (error) {

            logger.error(`[${req.evUniqueID}] ${this.MODULENAME} (${taskName}): ${JSON.stringify(error.message)}`);
            logger.debug(`[${req.evUniqueID}] ${this.MODULENAME} (${taskName}): ${JSON.stringify(error.message)}`);

            next(error);
          }

        } else {

          logger.error(`[${req.evUniqueID}] ${this.MODULENAME} (${taskName}): Auth token missing`);
          logger.debug(`[${req.evUniqueID}] ${this.MODULENAME} (${taskName}):Auth token missing`);

          next({ message: "Auth token missing", name: "JWT Token error" });

        }

      } catch (error) {
        //add error logs here
        logger.error(`[${req.evUniqueID}] ${this.MODULENAME} (${taskName}): ${error.message}`);
        logger.debug(`[${req.evUniqueID}] ${this.MODULENAME} (${taskName}): ${error.message}`);

        next(error);
      }
    }
  }
};
