/// <reference types="node" />
import { UUID } from "crypto";
export declare abstract class ExtendedBaseEntity {
    id: UUID;
    sequence: number;
}
