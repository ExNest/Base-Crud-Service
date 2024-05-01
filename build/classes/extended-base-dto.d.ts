import { ExtendedBaseEntity } from "classes";
import { BaseEntity } from "typeorm";
import { Constructor } from "types";
export declare class ExtendedBaseCreateDto<T extends (BaseEntity | ExtendedBaseEntity)> implements Omit<Constructor<T>, 'id' | 'sequence' | 'createdAt' | 'updatedAt' | 'deletedAt'> {
}
export declare class ExtendedBaseUpdateDto<T extends (BaseEntity | ExtendedBaseEntity)> implements Partial<ExtendedBaseCreateDto<T>> {
}
