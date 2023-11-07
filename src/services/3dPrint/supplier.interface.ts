export interface The3DPrintSupplierPageResponse {
  data: The3DPrintSupplier[];
  total: number;
  page: number;
  pageSize: number;
}

export interface The3DPrintSupplier {
  _id: string;
  creator: Creator;
  name: string;
  nameEn?: string;
  type: number[];
  filament: any[];
  filamentType: any[];
  createdAt: Date;
  updatedAt: Date;
  logo?: string;
  __v: number;
}

export interface Creator {
  projects: any[];
  _id: string;
  username: string;
  email: string;
  status: number;
  type: number;
  createdAt: Date;
  updatedAt: Date;
  __v: number;
  roles: string[];
}
