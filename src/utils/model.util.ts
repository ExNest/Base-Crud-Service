export class ModelUtil {
  static hasProperty(model: Function, ...properties: string[]): boolean | boolean[] {
    const modelStr: string = model.toString();
    const isClass: boolean = modelStr.startsWith('class');

    if (!isClass) {
      return isClass;
    }

    const firstBrace: number = modelStr.indexOf('{');
    const lastBrace: number = modelStr.lastIndexOf('}');

    const propertyList: string[] = modelStr
      .slice(firstBrace + 1, lastBrace)
      .trim()
      .split(/[\n\;]/gi)
      .filter((property: string) => {
        const isMethod: boolean = property.includes('(');
        return !isMethod && !!property.trim();
      })
      .map((property: string): string => property.trim());
    const propertySet: Set<string> = new Set(propertyList);

    if (properties.length <= 1) {
      return propertySet.has(properties[0] ?? '');
    }

    return properties.map((property: string): boolean => propertySet.has(property));
  }
}
