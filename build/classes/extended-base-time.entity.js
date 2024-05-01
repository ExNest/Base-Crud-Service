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
exports.ExtendedBaseTimeEntity = void 0;
const core_1 = require("@js-joda/core");
const extended_base_entity_1 = require("./extended-base.entity");
const typeorm_1 = require("typeorm");
const transformer_util_1 = require("../utils/transformer.util");
class ExtendedBaseTimeEntity extends extended_base_entity_1.ExtendedBaseEntity {
}
exports.ExtendedBaseTimeEntity = ExtendedBaseTimeEntity;
__decorate([
    (0, typeorm_1.Column)({
        type: "timestamptz",
        nullable: false,
        transformer: new transformer_util_1.LocalDateTimeTransformer()
    }),
    __metadata("design:type", core_1.LocalDateTime)
], ExtendedBaseTimeEntity.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: "timestamptz",
        nullable: false,
        transformer: new transformer_util_1.LocalDateTimeTransformer()
    }),
    __metadata("design:type", core_1.LocalDateTime)
], ExtendedBaseTimeEntity.prototype, "updatedAt", void 0);
__decorate([
    (0, typeorm_1.DeleteDateColumn)({
        type: "timestamptz",
        nullable: true,
        transformer: new transformer_util_1.LocalDateTimeTransformer()
    }),
    __metadata("design:type", core_1.LocalDateTime)
], ExtendedBaseTimeEntity.prototype, "deletedAt", void 0);
//# sourceMappingURL=extended-base-time.entity.js.map