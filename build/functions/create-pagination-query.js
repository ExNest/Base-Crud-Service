"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createBasePaginationQuery = void 0;
const common_1 = require("@nestjs/common");
const classes_1 = require("../classes");
const utils_1 = require("../utils");
const DEFAULT_PAGINATION_OPTION = {
    page: 0,
    pageSize: 25,
    separator: ':',
    orderBy: 'ASC',
};
function createBasePaginationQuery(entity, option = {
    page: DEFAULT_PAGINATION_OPTION.page,
    pageSize: DEFAULT_PAGINATION_OPTION.pageSize,
    separator: DEFAULT_PAGINATION_OPTION.separator,
}) {
    return (0, common_1.createParamDecorator)((data, ctx) => {
        const request = ctx.switchToHttp().getRequest();
        const { page, pageSize, order, } = request.query;
        const isPageArray = Array.isArray(page);
        const isPageSizeArray = Array.isArray(pageSize);
        const isOrderArray = Array.isArray(order);
        const seperator = !!option.separator ? option.separator : DEFAULT_PAGINATION_OPTION.separator;
        const parsedPage = !!parseInt(isPageArray ? page[0] : page, 10)
            ? parseInt(isPageArray ? page[0] : page, 10)
            : option.page;
        const parsedPageSize = !!parseInt(isPageSizeArray ? pageSize[0] : pageSize, 10)
            ? parseInt(isPageSizeArray ? pageSize[0] : pageSize, 10)
            : option.pageSize;
        const parsedOrder = (isOrderArray ? order : [order])
            .filter((value) => {
            const [property, orderBy] = value.split(seperator);
            const isBaseEntityProperty = utils_1.ModelUtil.hasProperty(classes_1.ExtendedBaseEntity, property);
            const isBaseTimeEntityProperty = utils_1.ModelUtil.hasProperty(classes_1.ExtendedBaseTimeEntity, property);
            const isEntityProperty = utils_1.ModelUtil.hasProperty(entity, property);
            return isBaseEntityProperty || isBaseTimeEntityProperty || isEntityProperty;
        })
            .map((value) => {
            const [property, orderBy] = value.split(seperator);
            const parsedOrderBy = orderBy === 'DESC' ? orderBy : DEFAULT_PAGINATION_OPTION.orderBy;
            return [property, parsedOrderBy];
        });
        return {
            page: parsedPage,
            pageSize: parsedPageSize,
            order: parsedOrder,
        };
    });
}
exports.createBasePaginationQuery = createBasePaginationQuery;
//# sourceMappingURL=create-pagination-query.js.map