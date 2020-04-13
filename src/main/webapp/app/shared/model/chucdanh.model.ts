import { INhansu } from 'app/shared/model/nhansu.model';

export interface IChucdanh {
  id?: number;
  machucdanh?: string;
  tenchucdanh?: string;
  sudung?: number;
  nhansus?: INhansu[];
  itemsPerPage?: number;
  sort?: string;
  order?: string;
  activePage?: number;

  ModalAdd?: boolean;
  ten?: string;
  ma?: string;
  sd?: number;
  chucdanhid?: number;
  filterTen?: string;
  filterMa?: string;
}

export const defaultValue: Readonly<IChucdanh> = {};
export declare const getSortState: (location: any, itemsPerPage: any) => IChucdanh;
