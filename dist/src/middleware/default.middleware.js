"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const uuid_1 = require("uuid");
const callGUID = uuid_1.v4();
let DefaultMiddleware = class DefaultMiddleware {
    hashAPIServer() {
        try {
        }
        catch (e) {
            common_1.Logger.error('hashAPIServer(): ' + e.message);
            return '--NOT AVAILABLE--';
        }
    }
    ;
    resolve(...args) {
        return (req, res, next) => {
            console.log("@@@@@@@@@@@@@@@@Executed");
            req.evUniqueID = callGUID;
            res.locals.evUniqueID = callGUID;
            const respMeta = {};
            respMeta['evUniqueID'] = callGUID;
            respMeta['requestURL'] = req.originalUrl;
            respMeta['apiBuildVersion'] = process.env.npm_package_version || '--NOT AVAILABLE--';
            respMeta['requestTS'] = Date.now();
            respMeta['tasks'] = [];
            res.locals.apiMeta = respMeta;
            let metadata = {};
            req.metadata = metadata;
            next();
        };
    }
};
DefaultMiddleware = __decorate([
    common_1.Injectable()
], DefaultMiddleware);
exports.DefaultMiddleware = DefaultMiddleware;
//# sourceMappingURL=default.middleware.js.map