"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExtendedBaseRepository = void 0;
const typeorm_1 = require("typeorm");
class ExtendedBaseRepository extends typeorm_1.Repository {
    constructor(target, manager, queryRunner) {
        super(target, manager, queryRunner);
    }
}
exports.ExtendedBaseRepository = ExtendedBaseRepository;
//# sourceMappingURL=extended-base-repository.js.map