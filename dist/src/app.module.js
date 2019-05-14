"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const default_middleware_1 = require("./middleware/default.middleware");
const users_module_1 = require("./devutils/users/users.module");
const user_entity_1 = require("./devutils/users/user.entity");
const auth_middleware_1 = require("./middleware/auth.middleware");
const ping_controller_1 = require("./ping/ping.controller");
const logger_middleware_1 = require("./middleware/logger.middleware");
const app_controller_1 = require("./app.controller");
const app_service_1 = require("./app.service");
const errorcodes_module_1 = require("./errorcodes/errorcodes.module");
let AppModule = class AppModule {
    configure(consumer) {
        consumer
            .apply(default_middleware_1.DefaultMiddleware)
            .forRoutes('*')
            .apply(auth_middleware_1.AuthMiddleware)
            .forRoutes('/users');
    }
};
AppModule = __decorate([
    common_1.Module({
        imports: [users_module_1.UsersModule, typeorm_1.TypeOrmModule.forRoot({
                type: 'postgres',
                port: 5432,
                username: 'postgres',
                password: 'admin2518',
                database: 'nestdapp',
                host: 'localhost',
                synchronize: true,
                entities: [user_entity_1.userEntity]
            }), errorcodes_module_1.ErrorcodesModule],
        controllers: [ping_controller_1.PingController, app_controller_1.AppController],
        providers: [logger_middleware_1.LogService, app_service_1.AppService],
        exports: [logger_middleware_1.LogService]
    })
], AppModule);
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map