import {
  baseDeleteRequest,
  baseDetailRequest,
  baseGetRequest,
  basePostRequest,
  basePutRequest,
} from "@/utils/axios";
import { Filament } from "./filament.interface";

// /3dPrint/filament get
export const getFilament = (params: any) => {
  return baseGetRequest("/3d-print/filament")(params);
};

// /3dPrint/filament post
export const postFilament = (data: Omit<Filament, "_id">) => {
  return basePostRequest("/3d-print/filament")(data);
};

// /3dPrint/filament put
export const putFilament = (id: string, data: Omit<Filament, "_id">) => {
  return basePutRequest("/3d-print/filament")(id, data);
};

// /3dPrint/filament delete
export const deleteFilament = (id: string) => {
  return baseDeleteRequest("/3d-print/filament")(id);
};

// detail
export const getFilamentDetail = (id: string) => {
  return baseDetailRequest("/3d-print/filament")(id);
};
