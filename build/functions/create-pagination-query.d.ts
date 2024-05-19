import { ExtendedBaseTimeEntity } from '../classes';
import { Constructor, IPaginationOption } from '../types';
export declare function createBasePaginationQuery<T extends ExtendedBaseTimeEntity>(entity: Constructor<T>, option?: IPaginationOption): (...dataOrPipes: unknown[]) => ParameterDecorator;
