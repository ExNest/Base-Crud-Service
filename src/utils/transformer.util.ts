import { LocalDateTime } from "@js-joda/core";
import { ValueTransformer } from "typeorm";
import { DateTimeUtil } from 'utils';

/// https://jojoldu.tistory.com/600
export class LocalDateTimeTransformer implements ValueTransformer {
  // entity -> db
  to(entityValue: LocalDateTime): Date {
    return DateTimeUtil.toDate(entityValue);
  }

  // db -> entity
  from(databaseValue: Date): LocalDateTime {
    return DateTimeUtil.toLocalDateTime(databaseValue);
  }
}