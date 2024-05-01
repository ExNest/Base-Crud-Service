import { LocalDateTime } from "@js-joda/core";
import { ExtendedBaseEntity } from "./extended-base.entity";
export declare abstract class ExtendedBaseTimeEntity extends ExtendedBaseEntity {
    createdAt: LocalDateTime;
    updatedAt: LocalDateTime;
    deletedAt: LocalDateTime;
}
