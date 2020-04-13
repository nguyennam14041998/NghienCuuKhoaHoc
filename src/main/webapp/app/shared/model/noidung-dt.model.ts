import { IDutoanKPCT } from 'app/shared/model/dutoan-kpct.model';

export interface INoidungDT {
  id?: number;
  tennoidung?: string;
  sudung?: number;
  dutoanKPCTS?: IDutoanKPCT[];
  itemsPerPage?: number;
  sort?: string;
  order?: string;
  activePage?: number;
  ModalAdd?: boolean;
  ten?: string;
  sd?: number;
  noidungid?: number;
}

export const defaultValue: Readonly<INoidungDT> = {};
export declare const getSortState: (location: any, itemsPerPage: any) => INoidungDT;
