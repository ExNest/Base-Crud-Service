import { Path, PathOption } from "../types";
export interface IPathOption {
    path?: Path;
}
export interface IInheritPathOption {
    path?: string | string[];
    parent?: Function;
}
export interface IExtendedControllerOption {
    pathOptions?: PathOption[];
}
export interface IReflectOption {
    metadataKey: string;
    metadataValue: any;
}
export declare function ExtendedController(options: IExtendedControllerOption): (target: Object) => void;
