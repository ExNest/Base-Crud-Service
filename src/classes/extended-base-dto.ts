import { ExtendedBaseTimeEntity } from "src/classes";
import { Constructor } from "src/types";

class ExtendedBaseCreateDto<T extends ExtendedBaseTimeEntity> implements Omit<Constructor<T>, 'id' | 'sequence' | 'createdAt' | 'updatedAt' | 'deletedAt' > {};
class ExtendedBaseUpdateDto<T extends ExtendedBaseTimeEntity> implements Partial<ExtendedBaseCreateDto<T>> {};

export { ExtendedBaseCreateDto, ExtendedBaseUpdateDto };