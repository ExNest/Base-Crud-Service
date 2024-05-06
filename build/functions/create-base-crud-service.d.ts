import { ExtendedBaseCreateDto, ExtendedBaseTimeEntity, ExtendedBaseUpdateDto } from "../classes/index";
import { DeleteResult, FindOptionsWhere, Repository, UpdateResult } from 'typeorm';
import { Constructor } from "../types/index";
export declare function createBaseCrudService<T extends ExtendedBaseTimeEntity>(entity: Constructor<T>): {
    new (repository: Repository<T>): {
        readonly repository: Repository<T>;
        read(targetOption?: FindOptionsWhere<T>, transaction?: boolean): Promise<T[]>;
        create(createDto: ExtendedBaseCreateDto<T>): Promise<T>;
        update(targetOption: FindOptionsWhere<T>, updateDto: ExtendedBaseUpdateDto<T>): Promise<UpdateResult>;
        softDelete(targetOption: FindOptionsWhere<T>): Promise<UpdateResult>;
        delete(targetOption: FindOptionsWhere<T>): Promise<DeleteResult>;
    };
};
