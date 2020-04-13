export interface IThanhvienHD {
  id?: number;
  ten?: string;
  donvi?: string;
  trachnhiem?: number;
  sudung?: number;
  hoidongdanhgiaId?: number;
  itemsPerPage?: number;
  sort?: string;
  order?: string;
  activePage?: number;
  ModalAdd?: boolean;
  tenTV?: string;
  tenDV?: string;
  tenTN?: number;
  sd?: number;
  hoidongdanhgia?: number;
  thanhvienid?: number;
  filterTen?: string;
  filterDonvi?: string;
  filterHoidong?: string;
}

export const defaultValue: Readonly<IThanhvienHD> = {};
export declare const getSortState: (location: any, itemsPerPage: any) => IThanhvienHD;
