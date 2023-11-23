import {
  baseGetRequest,
  basePostRequest,
  basePutRequest,
  baseDeleteRequest,
  baseDetailRequest,
} from "@/utils/axios";
import { FilamentType } from "./filamentType.interface";

// /3d-print/filament-type get
export const getFilamentType = () => {
  return baseGetRequest<FilamentType[]>("/3d-print/filament-type")();
};

// /3d-print/filament-type post
export const postFilamentType = (data: Omit<FilamentType, "_id">) => {
  return basePostRequest("/3d-print/filament-type")(data);
};

// /3d-print/filament-type put
export const putFilamentType = (
  id: string,
  data: Omit<FilamentType, "_id">
) => {
  return basePutRequest("/3d-print/filament-type")(id, data);
};

// /3d-print/filament-type delete
export const deleteFilamentType = (id: string) => {
  return baseDeleteRequest("/3d-print/filament-type")(id);
};

// detail
export const getFilamentTypeDetail = (id: string) => {
  return baseDetailRequest("/3d-print/filament-type")(id);
};
