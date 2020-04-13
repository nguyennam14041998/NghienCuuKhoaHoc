import { ICoquanphoihopthamgia } from 'app/shared/model/coquanphoihopthamgia.model';

export interface ICoquanphoihop {
  id?: number;
  macoquan?: string;
  tencoquan?: string;
  noidung?: string;
  tendaidien?: string;
  sudung?: number;
  coquanphoihopthamgias?: ICoquanphoihopthamgia[];
  itemsPerPage?: number;
  sort?: string;
  order?: string;
  activePage?: number;
  ModalAdd?: boolean;
  ten?: string;
  ma?: string;
  nd?: string;
  daidien?: string;
  sd?: number;
  coquanid?: number;
  filterTen?: string;
  filterMa?: string;
  filterDaidien?: string;
}

export const defaultValue: Readonly<ICoquanphoihop> = {};
export declare const getSortState: (location: any, itemsPerPage: any) => ICoquanphoihop;
