/// <reference types="node" />
import { UUID } from "crypto";
import { BaseEntity } from "typeorm";
export declare abstract class ExtendedBaseEntity extends BaseEntity {
    id: UUID;
    sequence: number;
}
