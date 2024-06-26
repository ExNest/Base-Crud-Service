'use strict';
var __decorate =
  (this && this.__decorate) ||
  function (decorators, target, key, desc) {
    var c = arguments.length,
      r = c < 3 ? target : desc === null ? (desc = Object.getOwnPropertyDescriptor(target, key)) : desc,
      d;
    if (typeof Reflect === 'object' && typeof Reflect.decorate === 'function')
      r = Reflect.decorate(decorators, target, key, desc);
    else
      for (var i = decorators.length - 1; i >= 0; i--)
        if ((d = decorators[i])) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
  };
var __metadata =
  (this && this.__metadata) ||
  function (k, v) {
    if (typeof Reflect === 'object' && typeof Reflect.metadata === 'function') return Reflect.metadata(k, v);
  };
var __param =
  (this && this.__param) ||
  function (paramIndex, decorator) {
    return function (target, key) {
      decorator(target, key, paramIndex);
    };
  };
Object.defineProperty(exports, '__esModule', { value: true });
exports.createBaseCrudService = void 0;
const typeorm_1 = require('@nestjs/typeorm');
const typeorm_2 = require('typeorm');
function createBaseCrudService(entity) {
  let BaseCrudService = class BaseCrudService {
    constructor(repository) {
      this.repository = repository;
    }
    async read(targetOption, transaction = true) {
      targetOption.transaction = transaction;
      return await this.repository.find(targetOption);
    }
    async create(createDto) {
      const isArray = Array.isArray(createDto);
      const length = isArray ? createDto.length : 1;
      const models = Array.from({ length }, (_, index) => {
        const model = this.repository.create();
        for (const [key, value] of Object.entries(isArray ? createDto[index] : createDto)) {
          model[key] = value;
        }
        return model;
      });
      return await this.repository.save(models);
    }
    async update(updateDto, targetOption = {}) {
      const queryRunner = this.repository.manager.connection.createQueryRunner();
      try {
        await queryRunner.connect();
        await queryRunner.startTransaction();
        const models = await this.read({
          where: targetOption,
          transaction: false,
        });
        if (!models || !models.length) {
          const error = {
            name: `Not Found`,
            message: `${entity.name} with Option ${targetOption} not found`,
          };
          throw error;
        }
        const result = await queryRunner.manager.withRepository(this.repository).update(targetOption, updateDto);
        await queryRunner.commitTransaction();
        return result;
      } catch (error) {
        await queryRunner.rollbackTransaction();
        throw error;
      } finally {
        await queryRunner.release();
      }
    }
    async softDelete(targetOption) {
      const queryRunner = this.repository.manager.connection.createQueryRunner();
      try {
        await queryRunner.connect();
        await queryRunner.startTransaction();
        const [model] = await this.read({
          where: targetOption,
          transaction: false,
        });
        if (!model) {
          const error = {
            name: `Not Found`,
            message: `${entity.name} with Option ${targetOption} not found`,
          };
          throw error;
        }
        const result = await queryRunner.manager.withRepository(this.repository).softDelete(targetOption);
        await queryRunner.commitTransaction();
        return result;
      } catch (error) {
        await queryRunner.rollbackTransaction();
        throw error;
      } finally {
        await queryRunner.release();
      }
    }
    async delete(targetOption) {
      const queryRunner = this.repository.manager.connection.createQueryRunner();
      try {
        await queryRunner.connect();
        await queryRunner.startTransaction();
        const [model] = await this.read({
          where: targetOption,
          transaction: false,
        });
        if (!model) {
          const error = {
            name: `Not Found`,
            message: `${entity.name} with Option ${targetOption} not found`,
          };
          throw error;
        }
        const result = await queryRunner.manager.withRepository(this.repository).delete(targetOption);
        await queryRunner.commitTransaction();
        return result;
      } catch (error) {
        await queryRunner.rollbackTransaction();
        throw error;
      } finally {
        await queryRunner.release();
      }
    }
  };
  BaseCrudService = __decorate(
    [__param(0, (0, typeorm_1.InjectRepository)(entity)), __metadata('design:paramtypes', [typeorm_2.Repository])],
    BaseCrudService,
  );
  return BaseCrudService;
}
exports.createBaseCrudService = createBaseCrudService;
//# sourceMappingURL=create-base-crud-service.js.map
