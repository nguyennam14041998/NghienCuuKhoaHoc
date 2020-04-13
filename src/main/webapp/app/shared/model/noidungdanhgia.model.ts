import { IDanhgiaCT } from 'app/shared/model/danhgia-ct.model';

export interface INoidungdanhgia {
  id?: number;
  noidung?: string;
  sudung?: number;
  danhgiaCTS?: IDanhgiaCT[];
  itemsPerPage?: number;
  sort?: string;
  order?: string;
  activePage?: number;
  ModalAdd?: boolean;
  ten?: string;
  sd?: number;
  noidungid?: number;
}

export const defaultValue: Readonly<INoidungdanhgia> = {};
export declare const getSortState: (location: any, itemsPerPage: any) => INoidungdanhgia;
