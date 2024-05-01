import { ExtendedBaseEntity } from "classes";
import { BaseEntity} from "typeorm";

export type Constructor<T extends (BaseEntity | ExtendedBaseEntity)> = new (arg: T) => T;