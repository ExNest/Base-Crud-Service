import { LocalDateTime } from "@js-joda/core";
import { ValueTransformer } from "typeorm";
export declare class LocalDateTimeTransformer implements ValueTransformer {
    to(entityValue: LocalDateTime): Date;
    from(databaseValue: Date): LocalDateTime;
}
