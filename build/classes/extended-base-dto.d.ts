import { ExtendedBaseTimeEntity } from "src/classes";
import { Constructor } from "src/types";
declare class ExtendedBaseCreateDto<T extends ExtendedBaseTimeEntity> implements Omit<Constructor<T>, 'id' | 'sequence' | 'createdAt' | 'updatedAt' | 'deletedAt'> {
}
declare class ExtendedBaseUpdateDto<T extends ExtendedBaseTimeEntity> implements Partial<ExtendedBaseCreateDto<T>> {
}
export { ExtendedBaseCreateDto, ExtendedBaseUpdateDto };
