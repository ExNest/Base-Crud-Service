import { ExtendedBaseTimeEntity } from "../classes/index";

export type Constructor<T extends ExtendedBaseTimeEntity> = new (arg: T) => T;