import { ExtendedBaseTimeEntity } from "src/classes";
import { Constructor, IPaginationOption } from "src/types";
export declare function createBasePaginationQuery<T extends ExtendedBaseTimeEntity>(entity: Constructor<T>, option?: IPaginationOption): (...dataOrPipes: unknown[]) => ParameterDecorator;
