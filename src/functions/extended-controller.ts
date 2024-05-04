import { Controller } from "@nestjs/common";
import { CONTROLLER_WATERMARK, HOST_METADATA, PATH_METADATA } from "@nestjs/common/constants";
import { Path, PathOption } from "../types";


export interface IPathOption {
  path?: Path;
}

export interface IInheritPathOption {
  path?: string | string[];
  parent?: Function;
};

export interface IExtendedControllerOption {
  pathOptions?: PathOption[];
}

export interface IReflectOption {
  metadataKey: string;
  metadataValue: any;
}

function InheritRoutes(option: PathOption): IReflectOption[] {
  const sperator: string = '/';
  let path: string = '';

  if(!!(option as IInheritPathOption).parent){
    const parentPath = Reflect.getMetadata(PATH_METADATA, (option as IInheritPathOption).parent);
    path += parentPath;
  }else{
    const parentPath = Reflect.getMetadata(PATH_METADATA, Controller);
    path += (parentPath ?? '');
  }

  const pathArray: string[] = Array.isArray(option.path) ? option.path : [option.path];

  const metadatas: IReflectOption[] = pathArray.map((pathStr) =>{
    const metadata: IReflectOption = {
      metadataKey: PATH_METADATA,
      metadataValue: path + sperator + pathStr
    };

    return metadata;
  })

  return metadatas;
}

function InheritRoutesArray(pathOptions: PathOption[]){
  const reflectOptions: IReflectOption[] = pathOptions.flatMap((pathOption: PathOption) => {
    return InheritRoutes(pathOption);
  });
  const pathArray: string[] = reflectOptions.map(({ metadataValue }) => metadataValue);
  return (target: Object) => {

    Reflect.defineMetadata(CONTROLLER_WATERMARK, true, target);
    Reflect.defineMetadata(PATH_METADATA, pathArray, target);
  }
}

export function ExtendedController(options: IExtendedControllerOption) {
  return InheritRoutesArray(options.pathOptions);
}