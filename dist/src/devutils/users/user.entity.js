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
const typeorm_1 = require("typeorm");
const class_validator_1 = require("class-validator");
let userEntity = class userEntity {
};
__decorate([
    typeorm_1.PrimaryGeneratedColumn(),
    __metadata("design:type", Number)
], userEntity.prototype, "id", void 0);
__decorate([
    typeorm_1.Column(),
    class_validator_1.IsNotEmpty(),
    class_validator_1.IsString(),
    class_validator_1.Length(8, 20),
    __metadata("design:type", String)
], userEntity.prototype, "username", void 0);
__decorate([
    typeorm_1.Column(),
    class_validator_1.IsNotEmpty(),
    class_validator_1.IsEmail(),
    __metadata("design:type", String)
], userEntity.prototype, "email", void 0);
__decorate([
    typeorm_1.Column("bigint"),
    class_validator_1.IsNotEmpty(),
    __metadata("design:type", Number)
], userEntity.prototype, "mobile", void 0);
__decorate([
    typeorm_1.Column(),
    class_validator_1.IsNotEmpty(),
    class_validator_1.Length(8, 15),
    __metadata("design:type", String)
], userEntity.prototype, "password", void 0);
__decorate([
    typeorm_1.Column('text'),
    class_validator_1.IsNotEmpty(),
    __metadata("design:type", String)
], userEntity.prototype, "address", void 0);
userEntity = __decorate([
    typeorm_1.Entity()
], userEntity);
exports.userEntity = userEntity;
//# sourceMappingURL=user.entity.js.map