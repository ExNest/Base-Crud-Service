"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createBasePaginationQuery = void 0;
const common_1 = require("@nestjs/common");
function createBasePaginationQuery(entity, option = {
    page: 0,
    pageSize: 25
}) {
    return (0, common_1.createParamDecorator)((data, ctx) => {
        const request = ctx.switchToHttp().getRequest();
        const { page, pageSize, order } = request.query;
    });
}
exports.createBasePaginationQuery = createBasePaginationQuery;
//# sourceMappingURL=create-pagination-query.js.map