import { InjectRepository } from "@nestjs/typeorm";
import { ExtendedBaseCreateDto, ExtendedBaseTimeEntity, ExtendedBaseUpdateDto } from "../classes/index";
import { DeepPartial, DeleteResult, FindOptionsWhere, QueryRunner, Repository, UpdateResult } from 'typeorm';
import { Constructor } from "../types/index";

export function createBaseCrudService<T extends ExtendedBaseTimeEntity>(entity: Constructor<T>){
  class BaseCrudService<M extends T>{
    constructor(
      @InjectRepository(entity)
      readonly repository: Repository<M>
    ){}

    async read(targetOption?: FindOptionsWhere<M>, transaction: boolean = true): Promise<M[]>{
      return await this.repository.find({
        where: targetOption,
        transaction
      });
    }

    async create(targetOption: FindOptionsWhere<M>, createDto: ExtendedBaseCreateDto<M>){
      const queryRunner: QueryRunner = this.repository.manager.connection.createQueryRunner();

      try {
        await queryRunner.connect();
        await queryRunner.startTransaction();
        
        const [findOne]: M[] = await this.read(targetOption, false);

        if(!!findOne){
          const error: Error = {
            name: `Already Exists`,
            message: `${entity.name} with Option ${targetOption} already exists`
          };

          throw error;
        }

        const newOne: M = queryRunner.manager.withRepository(this.repository).create({
          ...createDto
        } as DeepPartial<M>);
        
        const result: M = await queryRunner.manager.withRepository(this.repository).save(newOne, {
          transaction: false
        });

        await queryRunner.commitTransaction();
        return result;
      } catch (error) {
        await queryRunner.rollbackTransaction();
        throw error;
      } finally {
        await queryRunner.release();
      }
    }

    async update(targetOption: FindOptionsWhere<M>, updateDto: ExtendedBaseUpdateDto<M>){
      const queryRunner: QueryRunner = this.repository.manager.connection.createQueryRunner();

      try {
        await queryRunner.connect();
        await queryRunner.startTransaction();
        
        const findMany: M[] = await this.read(targetOption, false);

        if(!findMany || !findMany.length){
          const error: Error = {
            name: `Not Found`,
            message: `${entity.name} with Option ${targetOption} not found`
          };

          throw error;
        }

        const result: UpdateResult = await queryRunner.manager.withRepository(this.repository).update(targetOption, {...updateDto});

        await queryRunner.commitTransaction();
        return result;
      } catch (error) {
        await queryRunner.rollbackTransaction();
        throw error;
      } finally {
        await queryRunner.release();
      }
    }

    async softDelete(targetOption: FindOptionsWhere<M>){
      const queryRunner: QueryRunner = this.repository.manager.connection.createQueryRunner();

      try {
        await queryRunner.connect();
        await queryRunner.startTransaction();
        
        const [findOne]: M[] = await this.read(targetOption, false);

        if(!findOne){
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

    async delete(targetOption: FindOptionsWhere<M>){
      const queryRunner: QueryRunner = this.repository.manager.connection.createQueryRunner();

      try {
        await queryRunner.connect();
        await queryRunner.startTransaction();
        
        const [findOne]: M[] = await this.read(targetOption, false);

        if(!findOne){
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
