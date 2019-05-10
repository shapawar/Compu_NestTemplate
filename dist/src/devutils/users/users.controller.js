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
const user_post_dto_1 = require("./user.post.dto");
const users_service_1 = require("./users.service");
const logger_middleware_1 = require("src/middleware/logger.middleware");
let UsersController = class UsersController {
    constructor(userService, Logger) {
        this.userService = userService;
        this.Logger = Logger;
        this.MODULENAME = 'User Controller';
    }
    addPost(req, res, userpostdto) {
        return __awaiter(this, void 0, void 0, function* () {
            let taskName = 'Create User';
            try {
                this.Logger.info(`[${req.evUniqueID}] - ${this.MODULENAME} - ${taskName} - QueryData: ${JSON.stringify(req.body)}`);
                const newPost = yield this.userService.createUser(req.evUniqueID, userpostdto);
                return res.status(common_1.HttpStatus.OK).json({
                    message: "Post has been submitted successfully!",
                    post: newPost
                });
            }
            catch (error) {
                this.Logger.error(`[${req.evUniqueID}] - ${this.MODULENAME} - ${taskName} - ErrorMessage: ${error.message}`);
                this.Logger.log(`[${req.evUniqueID}] - ${this.MODULENAME} - ${taskName} - ErrorMessage: ${error.message}`);
                throw error;
            }
        });
    }
    getUserList(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let taskName = 'Fetch All User List';
            try {
                this.Logger.log(`[${req.evUniqueID}] - ${this.MODULENAME} - ${taskName} - QueryData: ${"-"}`);
                const userlist = yield this.userService.getUserList(req.evUniqueID);
                return res.status(common_1.HttpStatus.OK).json({
                    message: "Fetch User List successfully",
                    list: userlist
                });
            }
            catch (error) {
                this.Logger.error(`[${req.evUniqueID}] - ${this.MODULENAME} - ${taskName} - ErrorMessage: ${error.message}`);
                this.Logger.log(`[${req.evUniqueID}] - ${this.MODULENAME} - ${taskName} - ErrorMessage: ${error.message}`);
                throw error;
            }
        });
    }
    getUser(req, res, userID) {
        return __awaiter(this, void 0, void 0, function* () {
            let taskName = 'Get User Details';
            try {
                this.Logger.log(`[${req.evUniqueID}] - ${this.MODULENAME} - ${taskName} - QueryData: ${userID}`);
                const user = yield this.userService.getUser(req.evUniqueID, userID);
                return res.status(common_1.HttpStatus.OK).json({ message: "Fetch user info successfully", UserDetails: user });
            }
            catch (error) {
                this.Logger.error(`[${req.evUniqueID}] - ${this.MODULENAME} - ${taskName} - ErrorMessage: ${error.message}`);
                this.Logger.log(`[${req.evUniqueID}] - ${this.MODULENAME} - ${taskName} - ErrorMessage: ${error.message}`);
                throw error;
            }
        });
    }
    deleteUser(req, res, userID) {
        return __awaiter(this, void 0, void 0, function* () {
            let taskName = 'Delete User';
            try {
                this.Logger.log(`[${req.evUniqueID}] - ${this.MODULENAME} - ${taskName} - QueryData: ${userID}`);
                const user = yield this.userService.deleteUser(req.evUniqueID, userID);
                return res.status(common_1.HttpStatus.OK).json({ message: "User deleted successfully", data: user });
            }
            catch (error) {
                this.Logger.error(`[${req.evUniqueID}] - ${this.MODULENAME} - ${taskName} - ErrorMessage: ${error.message}`);
                this.Logger.log(`[${req.evUniqueID}] - ${this.MODULENAME} - ${taskName} - ErrorMessage: ${error.message}`);
                throw error;
            }
        });
    }
    updateUser(req, res, userPostDTO) {
        return __awaiter(this, void 0, void 0, function* () {
            let taskName = 'Update User';
            try {
                this.Logger.log(`[${req.evUniqueID}] - ${this.MODULENAME} - ${taskName} - QueryData: ${JSON.stringify(req.body)}`);
                const editPost = yield this.userService.editPost(req.evUniqueID, userPostDTO);
                return res.status(common_1.HttpStatus.OK).json({
                    message: 'user has been updated successfully ',
                    details: editPost
                });
            }
            catch (error) {
                this.Logger.error(`[${req.evUniqueID}] - ${this.MODULENAME} - ${taskName} - ErrorMessage: ${error.message}`);
                this.Logger.log(`[${req.evUniqueID}] - ${this.MODULENAME} - ${taskName} - ErrorMessage: ${error.message}`);
                throw error;
            }
        });
    }
};
__decorate([
    common_1.Post(),
    __param(0, common_1.Req()), __param(1, common_1.Res()), __param(2, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, user_post_dto_1.UserPostDTO]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "addPost", null);
__decorate([
    common_1.Get(),
    __param(0, common_1.Req()), __param(1, common_1.Res()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "getUserList", null);
__decorate([
    common_1.Get(':userID'),
    __param(0, common_1.Req()), __param(1, common_1.Res()), __param(2, common_1.Param('userID')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Object]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "getUser", null);
__decorate([
    common_1.Delete(':userID'),
    __param(0, common_1.Req()), __param(1, common_1.Res()), __param(2, common_1.Param('userID')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Object]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "deleteUser", null);
__decorate([
    common_1.Put(),
    __param(0, common_1.Req()), __param(1, common_1.Res()), __param(2, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, user_post_dto_1.UserPostDTO]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "updateUser", null);
UsersController = __decorate([
    common_1.Controller('users'),
    __metadata("design:paramtypes", [users_service_1.UsersService, logger_middleware_1.LogService])
], UsersController);
exports.UsersController = UsersController;
//# sourceMappingURL=users.controller.js.map