import { INhansu } from 'app/shared/model/nhansu.model';

export interface IDonvi {
  id?: number;
  madv?: string;
  tendv?: string;
  dienthoai?: number;
  fax?: number;
  email?: string;
  sudung?: number;
  nhansus?: INhansu[];
  itemsPerPage?: number;
  sort?: string;
  order?: string;
  activePage?: number;

  ModalAdd?: boolean;
  ten?: string;
  ma?: string;
  sdt?: number;
  sofax?: number;
  diachiemail?: string;
  sd?: number;
  donviid?: number;
  filterTen?: string;
  filterMa?: string;
}

export const defaultValue: Readonly<IDonvi> = {};
export declare const getSortState: (location: any, itemsPerPage: any) => IDonvi;
