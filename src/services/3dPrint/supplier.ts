import {
  baseGetRequest,
  basePostRequest,
  basePutRequest,
  baseDetailRequest,
  baseDeleteRequest,
} from "../../utils/axios";
import {
  The3DPrintSupplier,
  The3DPrintSupplierPageResponse,
} from "./supplier.interface";

// /3dPrint/supplier get
export const getSupplier = (params: any) => {
  return baseGetRequest<The3DPrintSupplierPageResponse>("/3dPrint/supplier")(
    params
  );
};

// post
export const postSupplier = (data: any) => {
  return basePostRequest("/3dPrint/supplier")(data);
};

// put
export const putSupplier = (id: string, data: any) => {
  return basePutRequest("/3dPrint/supplier")(id, data);
};

// detail
export const detailSupplier = (id: string) => {
  return baseDetailRequest<The3DPrintSupplier>("/3dPrint/supplier")(id);
};

// delete
export const deleteSupplier = (id: string) => {
  return baseDeleteRequest("/3dPrint/supplier")(id);
};

// /3dPrint/constant/supplierType get
export const getSupplierType = (params: any) => {
  return baseGetRequest("/3dPrint/constant/supplierType")(params);
};
