import { InjectRepository } from "@nestjs/typeorm";
import { ExtendedBaseCreateDto, ExtendedBaseTimeEntity, ExtendedBaseUpdateDto } from "../classes/index";
import { DeleteResult, FindManyOptions, FindOptionsWhere, InsertResult, QueryRunner, Repository, UpdateResult } from 'typeorm';
import { Constructor } from "../types/index";

export function createBaseCrudService<T extends ExtendedBaseTimeEntity>(entity: Constructor<T>){
  class BaseCrudService<M extends T>{
    constructor(
      @InjectRepository(entity)
      readonly repository: Repository<M>
    ){}

    async read(targetOption?: FindManyOptions<M>, transaction: boolean = true): Promise<M[]>{
      return await this.repository.find(targetOption);
    }

    async create(createDto: ExtendedBaseCreateDto<M> | ExtendedBaseCreateDto<M>[]): Promise<M[] | InsertResult>{
      const isArray: boolean = Array.isArray(createDto);
      const length: number = isArray ? (createDto as ExtendedBaseCreateDto<M>[]).length : 1;
      const models: M[] = Array.from({ length }, (_, index: number)=> {
        const model: M = this.repository.create();

        for(const [key, value] of Object.entries(isArray ? createDto[index] : createDto)){
          model[key] = value;
        }

        return model;
      });

      return await this.repository.save(models);
    }

    async update(updateDto: ExtendedBaseUpdateDto<M>, targetOption: FindOptionsWhere<M> = {}): Promise<UpdateResult>{
      const queryRunner: QueryRunner = this.repository.manager.connection.createQueryRunner();

      try {
        await queryRunner.connect();
        await queryRunner.startTransaction();
        
        const models: M[] = await this.read({
          where: targetOption,
          transaction: false
        });

        if(!models || !models.length){
          const error: Error = {
            name: `Not Found`,
            message: `${entity.name} with Option ${targetOption} not found`
          };

          throw error;
        }

        const result: UpdateResult = await queryRunner.manager.withRepository(this.repository).update(targetOption, updateDto);

        await queryRunner.commitTransaction();
        return result;
      } catch (error) {
        await queryRunner.rollbackTransaction();
        throw error;
      } finally {
        await queryRunner.release();
      }
    }

    async softDelete(targetOption: FindOptionsWhere<M>): Promise<UpdateResult>{
      const queryRunner: QueryRunner = this.repository.manager.connection.createQueryRunner();

      try {
        await queryRunner.connect();
        await queryRunner.startTransaction();
        
        const [model]: M[] = await this.read({
          where: targetOption,
          transaction: false
        });

        if(!model){
          const error: Error = {
            name: `Not Found`,
            message: `${entity.name} with Option ${targetOption} not found`
          };

          throw error;
        }

        const result: UpdateResult = await queryRunner.manager.withRepository(this.repository).softDelete(targetOption);

        await queryRunner.commitTransaction();
        return result;
      } catch (error) {
        await queryRunner.rollbackTransaction();
        throw error;
      } finally {
        await queryRunner.release();
      }
    }

    async delete(targetOption: FindOptionsWhere<M>): Promise<DeleteResult>{
      const queryRunner: QueryRunner = this.repository.manager.connection.createQueryRunner();

      try {
        await queryRunner.connect();
        await queryRunner.startTransaction();
        
        const [model]: M[] = await this.read({
          where: targetOption,
          transaction: false
        });

        if(!model){
          const error: Error = {
            name: `Not Found`,
            message: `${entity.name} with Option ${targetOption} not found`
          };

          throw error;
        }

        const result: DeleteResult = await queryRunner.manager.withRepository(this.repository).delete(targetOption);

        await queryRunner.commitTransaction();
        return result;
      } catch (error) {
        await queryRunner.rollbackTransaction();
        throw error;
      } finally {
        await queryRunner.release();
      }
    }
  }

  return BaseCrudService<T>;
}
