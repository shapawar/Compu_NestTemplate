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
const crypto = require("crypto");
const os = require("os");
const callGUID = uuid_1.v4();
let DefaultMiddleware = class DefaultMiddleware {
    constructor() {
        this.apiResp = {};
    }
    hashAPIServer() {
        try {
            const hash = crypto.createHash('sha256');
            hash.update(os.hostname());
            return hash.digest('base64');
        }
        catch (e) {
            common_1.Logger.error('hashAPIServer(): ' + e.message);
            return '--NOT AVAILABLE--';
        }
    }
    ;
    resolve(...args) {
        return (req, res, next) => {
            req.evUniqueID = callGUID;
            res.locals.evUniqueID = callGUID;
            this.apiResp.evUniqueID = callGUID;
            this.apiResp.requestURL = req.originalUrl;
            this.apiResp.apiServer = this.hashAPIServer();
            this.apiResp.apiBuildVersion = process.env.npm_package_version || '--NOT AVAILABLE--';
            this.apiResp.requestTS = Date.now();
            this.apiResp.tasks = [];
            req.metadata = this.apiResp;
            next();
        };
    }
};
DefaultMiddleware = __decorate([
    common_1.Injectable()
], DefaultMiddleware);
exports.DefaultMiddleware = DefaultMiddleware;
//# sourceMappingURL=default.middleware.js.map