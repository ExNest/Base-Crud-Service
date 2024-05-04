"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExtendedController = void 0;
const common_1 = require("@nestjs/common");
const constants_1 = require("@nestjs/common/constants");
;
function InheritRoutes(option) {
    const sperator = '/';
    let path = '';
    if (!!option.parent) {
        const parentPath = Reflect.getMetadata(constants_1.PATH_METADATA, option.parent);
        path += parentPath;
    }
    else {
        const parentPath = Reflect.getMetadata(constants_1.PATH_METADATA, common_1.Controller);
        path += (parentPath !== null && parentPath !== void 0 ? parentPath : '');
    }
    const pathArray = Array.isArray(option.path) ? option.path : [option.path];
    const metadatas = pathArray.map((pathStr) => {
        const metadata = {
            metadataKey: constants_1.PATH_METADATA,
            metadataValue: path + sperator + pathStr
        };
        return metadata;
    });
    return metadatas;
}
function InheritRoutesArray(pathOptions) {
    const reflectOptions = pathOptions.flatMap((pathOption) => {
        return InheritRoutes(pathOption);
    });
    const pathArray = reflectOptions.map(({ metadataValue }) => metadataValue);
    return (target) => {
        Reflect.defineMetadata(constants_1.CONTROLLER_WATERMARK, true, target);
        Reflect.defineMetadata(constants_1.PATH_METADATA, pathArray, target);
    };
}
function ExtendedController(options) {
    return InheritRoutesArray(options.pathOptions);
}
exports.ExtendedController = ExtendedController;
//# sourceMappingURL=extended-controller.js.map