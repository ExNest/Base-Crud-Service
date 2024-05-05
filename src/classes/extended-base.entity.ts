import { UUID } from "crypto";
import { Column, PrimaryColumn } from "typeorm";

export abstract class ExtendedBaseEntity{
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