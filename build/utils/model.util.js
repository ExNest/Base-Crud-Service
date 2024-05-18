'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
exports.ModelUtil = void 0;
class ModelUtil {
  static hasProperty(model, ...properties) {
    var _a;
    const modelStr = model.toString();
    const isClass = modelStr.startsWith('class');
    if (!isClass) {
      return isClass;
    }
    const firstBrace = modelStr.indexOf('{');
    const lastBrace = modelStr.lastIndexOf('}');
    const propertyList = modelStr
      .slice(firstBrace + 1, lastBrace)
      .trim()
      .split(/[\n\;]/gi)
      .filter((property) => {
        const isMethod = property.includes('(');
        return !isMethod && !!property.trim();
      })
      .map((property) => property.trim());
    const propertySet = new Set(propertyList);
    if (properties.length <= 1) {
      return propertySet.has((_a = properties[0]) !== null && _a !== void 0 ? _a : '');
    }
    return properties.map((property) => propertySet.has(property));
  }
}
exports.ModelUtil = ModelUtil;
//# sourceMappingURL=model.util.js.map
