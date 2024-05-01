import { UUID } from "crypto";
import { BaseEntity, Column, PrimaryColumn } from "typeorm";

export abstract class ExtendedBaseEntity extends BaseEntity{
  @PrimaryColumn({
    type: "uuid",
    primary: true,
    unique: true
  })
  id: UUID;

  @Column({
    type: 'int',
    generated: 'increment'
  })
  sequence: number;
}