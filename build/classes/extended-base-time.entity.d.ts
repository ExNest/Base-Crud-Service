import { LocalDateTime } from "@js-joda/core";
import { ExtendedBaseEntity } from "src/classes";
export declare abstract class ExtendedBaseTimeEntity extends ExtendedBaseEntity {
    createdAt: LocalDateTime;
    updatedAt: LocalDateTime;
    deletedAt: LocalDateTime;
}
