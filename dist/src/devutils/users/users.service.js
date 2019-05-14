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
const typeorm_2 = require("typeorm");
const user_entity_1 = require("./user.entity");
const logger_middleware_1 = require("../../middleware/logger.middleware");
let UsersService = class UsersService {
    constructor(userRepository, Logger) {
        this.userRepository = userRepository;
        this.Logger = Logger;
        this.MODULENAME = 'USERSERVICE';
    }
    createUser(evUniqueID, data) {
        return __awaiter(this, void 0, void 0, function* () {
            let taskName = 'createUser';
            try {
                this.Logger.debug(`[${evUniqueID}](${this.MODULENAME})-(${taskName})- QueryData: ${JSON.stringify(data)}`);
                const checkuser = yield this.userRepository.findOne({ username: data.username });
                if (checkuser == undefined) {
                    const savedata = yield this.userRepository.save(data);
                    return savedata;
                }
                else {
                    throw new Error(`Username is already present plz try another !!!`);
                }
            }
            catch (error) {
                this.Logger.debug(`[${evUniqueID}](${this.MODULENAME})-(${taskName})- ${error.stack}`);
                this.Logger.error(`[${evUniqueID}](${this.MODULENAME})-(${taskName})- ${error.message}`);
                throw error;
            }
        });
    }
    getUserList(evUniqueID) {
        return __awaiter(this, void 0, void 0, function* () {
            let taskName = 'getUserList';
            try {
                this.Logger.debug(`[${evUniqueID}](${this.MODULENAME})-(${taskName})- QueryData: - `);
                const list = yield this.userRepository.find();
                return list;
            }
            catch (error) {
                this.Logger.debug(`[${evUniqueID}](${this.MODULENAME})-(${taskName})- ${error.stack}`);
                this.Logger.error(`[${evUniqueID}](${this.MODULENAME})-(${taskName})- ${error.message}`);
                throw error;
            }
        });
    }
    getUser(evUniqueID, userid) {
        return __awaiter(this, void 0, void 0, function* () {
            let taskName = 'getUser';
            try {
                this.Logger.debug(`[${evUniqueID}](${this.MODULENAME})-(${taskName})- QueryData: ${userid}`);
                const details = yield this.userRepository.findOne({ username: userid });
                return details;
            }
            catch (error) {
                this.Logger.debug(`[${evUniqueID}](${this.MODULENAME})-(${taskName})- ${error.stack}`);
                this.Logger.error(`[${evUniqueID}](${this.MODULENAME})-(${taskName})- ${error.message}`);
                throw error;
            }
        });
    }
    deleteUser(evUniqueID, userid) {
        return __awaiter(this, void 0, void 0, function* () {
            let taskName = 'deleteUser';
            try {
                this.Logger.debug(`[${evUniqueID}](${this.MODULENAME})-(${taskName})- QueryData: ${userid}`);
                const user = yield this.userRepository.delete({ username: userid });
                return user;
            }
            catch (error) {
                this.Logger.debug(`[${evUniqueID}](${this.MODULENAME})-(${taskName})- ${error.stack}`);
                this.Logger.error(`[${evUniqueID}](${this.MODULENAME})-(${taskName})- ${error.message}`);
                throw error;
            }
        });
    }
    editPost(evUniqueID, data) {
        return __awaiter(this, void 0, void 0, function* () {
            let taskName = 'editPost';
            try {
                this.Logger.debug(`[${evUniqueID}](${this.MODULENAME})-(${taskName})- QueryData: ${JSON.stringify(data)}`);
                const editedPost = yield this.userRepository.update({ username: data.username }, data);
                return editedPost;
            }
            catch (error) {
                this.Logger.debug(`[${evUniqueID}](${this.MODULENAME})-(${taskName})- ${error.stack}`);
                this.Logger.error(`[${evUniqueID}](${this.MODULENAME})-(${taskName})- ${error.message}`);
                throw error;
            }
        });
    }
    registerUsers(evUniqueID, data) {
        return __awaiter(this, void 0, void 0, function* () {
            let taskName = 'registerUsers';
            try {
                this.Logger.debug(`[${evUniqueID}](${this.MODULENAME})-(${taskName})- QueryData: ${JSON.stringify(data)}`);
                const savedata = yield typeorm_2.getManager().query(`INSERT INTO user_entity(username, email, mobile, password, address) VALUES ('${data.username}','${data.email}','${data.mobile}','${data.password}','${data.address}')`);
                return savedata;
            }
            catch (error) {
                this.Logger.debug(`[${evUniqueID}](${this.MODULENAME})-(${taskName})- ${error.stack}`);
                this.Logger.error(`[${evUniqueID}](${this.MODULENAME})-(${taskName})- ${error.message}`);
                throw error;
            }
        });
    }
    getUserData(evUniqueID) {
        return __awaiter(this, void 0, void 0, function* () {
            let taskName = 'getUserData';
            try {
                this.Logger.debug(`[${evUniqueID}](${this.MODULENAME})-(${taskName})- QueryData: - `);
                const list = yield typeorm_2.getManager().query(`SELECT * FROM user_entity`);
                return list;
            }
            catch (error) {
                this.Logger.debug(`[${evUniqueID}](${this.MODULENAME})-(${taskName})- ${error.stack}`);
                this.Logger.error(`[${evUniqueID}](${this.MODULENAME})-(${taskName})- ${error.message}`);
                throw error;
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