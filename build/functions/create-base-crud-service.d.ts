import { ExtendedBaseCreateDto, ExtendedBaseTimeEntity, ExtendedBaseUpdateDto } from "../classes/index";
import { DeleteResult, FindManyOptions, FindOptionsWhere, InsertResult, Repository, UpdateResult } from 'typeorm';
import { Constructor } from "../types/index";
export declare function createBaseCrudService<T extends ExtendedBaseTimeEntity>(entity: Constructor<T>): {
    new (repository: Repository<T>): {
        readonly repository: Repository<T>;
        read(targetOption?: FindManyOptions<T>, transaction?: boolean): Promise<T[]>;
        create(createDto: ExtendedBaseCreateDto<T> | ExtendedBaseCreateDto<T>[]): Promise<InsertResult | T[]>;
        update(updateDto: ExtendedBaseUpdateDto<T>, targetOption?: FindOptionsWhere<T>): Promise<UpdateResult>;
        softDelete(targetOption: FindOptionsWhere<T>): Promise<UpdateResult>;
        delete(targetOption: FindOptionsWhere<T>): Promise<DeleteResult>;
    };
};
