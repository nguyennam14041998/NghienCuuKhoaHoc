import { IDetai } from 'app/shared/model/detai.model';

export interface ICapdetai {
  id?: number;
  macapdetai?: string;
  tencapdetai?: string;
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
  capdetaiid?: number;
  filterTen?: string;
  filterMa?: string;
}

export const defaultValue: Readonly<ICapdetai> = {};
export declare const getSortState: (location: any, itemsPerPage: any) => ICapdetai;
