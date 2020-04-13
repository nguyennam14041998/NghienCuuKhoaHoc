import { IDetai } from 'app/shared/model/detai.model';

export interface ILinhvuc {
  id?: number;
  malv?: string;
  tenlv?: string;
  sudung?: number;
  detais?: IDetai[];
  itemsPerPage?: number;
  sort?: string;
  order?: string;
  activePage?: number;

  ModalAdd?: boolean;
  ten?: string;
  ma?: string;
  sd?: number;
  linhvucid?: number;
  filterTen?: string;
  filterMa?: string;
}

export const defaultValue: Readonly<ILinhvuc> = {};
export declare const getSortState: (location: any, itemsPerPage: any) => ILinhvuc;
