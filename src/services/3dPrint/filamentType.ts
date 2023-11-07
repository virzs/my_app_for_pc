import {
  baseGetRequest,
  basePostRequest,
  basePutRequest,
  baseDeleteRequest,
  baseDetailRequest,
} from "@/utils/axios";
import { FilamentType } from "./filamentType.interface";

// /3dPrint/filament-type get
export const getFilamentType = () => {
  return baseGetRequest<FilamentType[]>("/3dPrint/filament-type")();
};

// /3dPrint/filament-type post
export const postFilamentType = (data: Omit<FilamentType, "_id">) => {
  return basePostRequest("/3dPrint/filament-type")(data);
};

// /3dPrint/filament-type put
export const putFilamentType = (
  id: string,
  data: Omit<FilamentType, "_id">
) => {
  return basePutRequest("/3dPrint/filament-type")(id, data);
};

// /3dPrint/filament-type delete
export const deleteFilamentType = (id: string) => {
  return baseDeleteRequest("/3dPrint/filament-type")(id);
};

// detail
export const getFilamentTypeDetail = (id: string) => {
  return baseDetailRequest("/3dPrint/filament-type")(id);
};
