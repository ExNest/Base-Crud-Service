import { ExecutionContext, createParamDecorator } from '@nestjs/common';
import { Request } from 'express';
import { ExtendedBaseEntity, ExtendedBaseTimeEntity } from '../classes';
import { Constructor, IPaginationOption } from '../types';
import { ModelUtil } from '../utils';

const DEFAULT_PAGINATION_OPTION: IPaginationOption = {
  page: 0,
  pageSize: 25,
  separator: ':',
  orderBy: 'ASC',
} as const;

export function createBasePaginationQuery<T extends ExtendedBaseTimeEntity>(
  entity: Constructor<T>,
  option: IPaginationOption = {
    page: DEFAULT_PAGINATION_OPTION.page,
    pageSize: DEFAULT_PAGINATION_OPTION.pageSize,
    separator: DEFAULT_PAGINATION_OPTION.separator,
  },
) {
  return createParamDecorator((data: unknown, ctx: ExecutionContext) => {
    const request: Request = ctx.switchToHttp().getRequest();
    const {
      page,
      pageSize,
      order,
    }: { page: string | string[]; pageSize: string | string[]; order: string | string[] } = request.query as {
      page: string | string[];
      pageSize: string | string[];
      order: string | string[];
    };

    const isPageArray: boolean = Array.isArray(page);
    const isPageSizeArray: boolean = Array.isArray(pageSize);
    const isOrderArray: boolean = Array.isArray(order);
    const seperator: string = !!option.separator ? option.separator : DEFAULT_PAGINATION_OPTION.separator;

    const parsedPage: number = !!parseInt(isPageArray ? (page as string[])[0] : (page as string), 10)
      ? parseInt(isPageArray ? (page as string[])[0] : (page as string), 10)
      : option.page;
    const parsedPageSize: number = !!parseInt(isPageSizeArray ? (pageSize as string[])[0] : (pageSize as string), 10)
      ? parseInt(isPageSizeArray ? (pageSize as string[])[0] : (pageSize as string), 10)
      : option.pageSize;
    const parsedOrder: string[][] = (isOrderArray ? (order as string[]) : ([order] as string[]))
      .filter((value: string): boolean => {
        const [property, orderBy]: string[] = value.split(seperator);

        const isBaseEntityProperty: boolean = ModelUtil.hasProperty(ExtendedBaseEntity, property) as boolean;
        const isBaseTimeEntityProperty: boolean = ModelUtil.hasProperty(ExtendedBaseTimeEntity, property) as boolean;
        const isEntityProperty: boolean = ModelUtil.hasProperty(entity, property) as boolean;
        return isBaseEntityProperty || isBaseTimeEntityProperty || isEntityProperty;
      })
      .map((value: string): string[] => {
        const [property, orderBy]: string[] = value.split(seperator);
        const parsedOrderBy: string = orderBy === 'DESC' ? orderBy : DEFAULT_PAGINATION_OPTION.orderBy;
        return [property, parsedOrderBy];
      });

    return {
      page: parsedPage,
      pageSize: parsedPageSize,
      order: parsedOrder,
    };
  });
}
