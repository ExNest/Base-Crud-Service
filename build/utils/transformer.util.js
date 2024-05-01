"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LocalDateTimeTransformer = void 0;
const datetime_util_1 = require("./datetime.util");
class LocalDateTimeTransformer {
    to(entityValue) {
        return datetime_util_1.DateTimeUtil.toDate(entityValue);
    }
    from(databaseValue) {
        return datetime_util_1.DateTimeUtil.toLocalDateTime(databaseValue);
    }
}
exports.LocalDateTimeTransformer = LocalDateTimeTransformer;
//# sourceMappingURL=transformer.util.js.map