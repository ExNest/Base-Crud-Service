import { ExtendedBaseTimeEntity } from "./extended-base-time.entity";
import { EntityManager, EntityTarget, QueryRunner, Repository } from "typeorm";
export declare class ExtendedBaseRepository<T extends ExtendedBaseTimeEntity> extends Repository<T> {
    constructor(target: EntityTarget<T>, manager: EntityManager, queryRunner?: QueryRunner);
}
