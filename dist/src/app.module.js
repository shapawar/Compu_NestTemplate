"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const app_controller_1 = require("./app.controller");
const app_service_1 = require("./app.service");
const auth_controller_1 = require("./auth/auth.controller");
const default_middleware_1 = require("./middleware/default.middleware");
const users_module_1 = require("./devutils/users/users.module");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const user_entity_1 = require("./devutils/users/user.entity");
const login_module_1 = require("./devutils/login/login.module");
const auth_middleware_1 = require("./middleware/auth.middleware");
let AppModule = class AppModule {
    constructor(connection) {
        this.connection = connection;
    }
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
            }), login_module_1.LoginModule],
        controllers: [app_controller_1.AppController, auth_controller_1.AuthController],
        providers: [app_service_1.AppService]
    }),
    __metadata("design:paramtypes", [typeorm_2.Connection])
], AppModule);
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map