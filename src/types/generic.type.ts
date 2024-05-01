import { ExtendedBaseTimeEntity } from "src/classes";

export type Constructor<T extends ExtendedBaseTimeEntity> = new (arg: T) => T;