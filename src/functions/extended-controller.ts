import { Controller } from "@nestjs/common";
import { PATH_METADATA } from "@nestjs/common/constants";
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
      metadataValue: path + pathStr
    };

    return metadata;
  })

  return metadatas;
}

function InheritRoutesArray(pathOptions: PathOption[]){
  const reflectOptions: IReflectOption[] = pathOptions.flatMap((pathOption: PathOption) => {
    return InheritRoutes(pathOption);
  });
  return (target: Object) => {
    reflectOptions.forEach(({ metadataKey, metadataValue }) => {
      Reflect.defineMetadata(
        metadataKey,
        metadataValue,
        target
      )
    })
  }
}

export function ExtendedController(options: IExtendedControllerOption) {
  return InheritRoutesArray(options.pathOptions);
}