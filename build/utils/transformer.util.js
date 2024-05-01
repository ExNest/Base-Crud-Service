"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LocalDateTimeTransformer = void 0;
const utils_1 = require("utils");
class LocalDateTimeTransformer {
    to(entityValue) {
        return utils_1.DateTimeUtil.toDate(entityValue);
    }
    from(databaseValue) {
        return utils_1.DateTimeUtil.toLocalDateTime(databaseValue);
    }
}
exports.LocalDateTimeTransformer = LocalDateTimeTransformer;
//# sourceMappingURL=transformer.util.js.map