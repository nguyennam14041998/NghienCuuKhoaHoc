import { INhansu } from 'app/shared/model/nhansu.model';

export interface IHocham {
  id?: number;
  mahocham?: string;
  tenhocham?: string;
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
  hochamid?: number;
  filterTen?: string;
  filterMa?: string;
}

export const defaultValue: Readonly<IHocham> = {};
export declare const getSortState: (location: any, itemsPerPage: any) => IHocham;
