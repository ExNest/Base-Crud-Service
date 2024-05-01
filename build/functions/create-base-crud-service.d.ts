import { ExtendedBaseCreateDto, ExtendedBaseRepository, ExtendedBaseTimeEntity, ExtendedBaseUpdateDto } from "classes";
import { FindOptionsWhere } from 'typeorm';
import { Constructor } from "types";
export declare function createBaseCrudService<T extends ExtendedBaseTimeEntity>(entity: Constructor<T>): {
    new (repository: ExtendedBaseRepository<T>): {
        readonly repository: ExtendedBaseRepository<T>;
        read(targetOption?: FindOptionsWhere<T>, transaction?: boolean): Promise<T[]>;
        create(targetOption: FindOptionsWhere<T>, createDto: ExtendedBaseCreateDto<T>): Promise<void>;
        update(targetOption: FindOptionsWhere<T>, updateDto: ExtendedBaseUpdateDto<T>): Promise<void>;
        softDelete(targetOption: FindOptionsWhere<T>): Promise<void>;
        delete(targetOption: FindOptionsWhere<T>): Promise<void>;
    };
};
