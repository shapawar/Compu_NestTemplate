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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const user_entity_1 = require("./user.entity");
const typeorm_2 = require("typeorm");
const logger_middleware_1 = require("src/middleware/logger.middleware");
let UsersService = class UsersService {
    constructor(userRepository, Logger) {
        this.userRepository = userRepository;
        this.Logger = Logger;
        this.MODULENAME = 'User Service';
    }
    createUser(evUniqueID, data) {
        return __awaiter(this, void 0, void 0, function* () {
            let taskName = 'createUser';
            try {
                this.Logger.info(`[${evUniqueID}] - ${this.MODULENAME}-(${taskName})- QueryData: ${JSON.stringify(data)}`);
                const savedata = yield this.userRepository.save(data);
                return savedata;
            }
            catch (error) {
                this.Logger.log(`[${evUniqueID}] - ${this.MODULENAME}-(${taskName})- ${error.stack}`);
                this.Logger.error(`[${evUniqueID}] - ${this.MODULENAME}-(${taskName})- ${error.message}`);
                return error;
            }
        });
    }
    getUserList(evUniqueID) {
        return __awaiter(this, void 0, void 0, function* () {
            let taskName = 'getUserList';
            try {
                this.Logger.info(`[${evUniqueID}] - ${this.MODULENAME}-(${taskName})- QueryData: - `);
                const list = yield this.userRepository.find();
                return list;
            }
            catch (error) {
                this.Logger.log(`[${evUniqueID}] - ${this.MODULENAME}-(${taskName})- ${error.stack}`);
                this.Logger.error(`[${evUniqueID}] - ${this.MODULENAME}-(${taskName})- ${error.message}`);
                return error;
            }
        });
    }
    getUser(evUniqueID, userid) {
        return __awaiter(this, void 0, void 0, function* () {
            let taskName = 'getUser';
            try {
                this.Logger.info(`[${evUniqueID}] - ${this.MODULENAME}-(${taskName})- QueryData: ${userid}`);
                const details = yield this.userRepository.findOne({ username: userid });
                return details;
            }
            catch (error) {
                this.Logger.log(`[${evUniqueID}] - ${this.MODULENAME}-(${taskName})- ${error.stack}`);
                this.Logger.error(`[${evUniqueID}] - ${this.MODULENAME}-(${taskName})- ${error.message}`);
                return error;
            }
        });
    }
    deleteUser(evUniqueID, userid) {
        return __awaiter(this, void 0, void 0, function* () {
            let taskName = 'deleteUser';
            try {
                this.Logger.info(`[${evUniqueID}] - ${this.MODULENAME}-(${taskName})- QueryData: ${userid}`);
                const user = yield this.userRepository.remove(userid);
                return user;
            }
            catch (error) {
                this.Logger.log(`[${evUniqueID}] - ${this.MODULENAME}-(${taskName})- ${error.stack}`);
                this.Logger.error(`[${evUniqueID}] - ${this.MODULENAME}-(${taskName})- ${error.message}`);
                return error;
            }
        });
    }
    editPost(evUniqueID, data) {
        return __awaiter(this, void 0, void 0, function* () {
            let taskName = 'editPost';
            try {
                this.Logger.info(`[${evUniqueID}] - ${this.MODULENAME}-(${taskName})- QueryData: ${JSON.stringify(data)}`);
                const editedPost = yield this.userRepository.update({ username: data.username }, data);
                return editedPost;
            }
            catch (error) {
                this.Logger.log(`[${evUniqueID}] - ${this.MODULENAME}-(${taskName})- ${error.stack}`);
                this.Logger.error(`[${evUniqueID}] - ${this.MODULENAME}-(${taskName})- ${error.message}`);
                return error;
            }
        });
    }
};
UsersService = __decorate([
    common_1.Injectable(),
    __param(0, typeorm_1.InjectRepository(user_entity_1.userEntity)),
    __metadata("design:paramtypes", [typeorm_2.Repository, logger_middleware_1.LogService])
], UsersService);
exports.UsersService = UsersService;
//# sourceMappingURL=users.service.js.map