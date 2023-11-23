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

// /3d-print/supplier get
export const getSupplier = (params: any) => {
  return baseGetRequest<The3DPrintSupplierPageResponse>("/3d-print/supplier")(
    params
  );
};

// post
export const postSupplier = (data: any) => {
  return basePostRequest("/3d-print/supplier")(data);
};

// put
export const putSupplier = (id: string, data: any) => {
  return basePutRequest("/3d-print/supplier")(id, data);
};

// detail
export const detailSupplier = (id: string) => {
  return baseDetailRequest<The3DPrintSupplier>("/3d-print/supplier")(id);
};

// delete
export const deleteSupplier = (id: string) => {
  return baseDeleteRequest("/3d-print/supplier")(id);
};

// /3d-print/constant/supplierType get
export const getSupplierType = (params: any) => {
  return baseGetRequest("/3d-print/constant/supplierType")(params);
};

// list
export const getSupplierList = (params: any) => {
  return baseGetRequest("/3d-print/supplier/list")(params);
};
