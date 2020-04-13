import { IDetai } from 'app/shared/model/detai.model';
import { Moment } from 'moment';
export interface IChunhiem {
  id?: number;
  sudung?: number;
  detais?: IDetai[];
  nhansuId?: number;
  tennhansu?: string;
  email?: string;
  diachi?: string;
  ngaysinh?: Moment;
  itemsPerPage?: number;
  sort?: string;
  order?: string;
  activePage?: number;

  ModalAdd?: boolean;
  filterTen?: string;
  chunhiemid?: number;
  nhansu?: number;
  sd?: number;
}

export const defaultValue: Readonly<IChunhiem> = {};
export declare const getSortState: (location: any, itemsPerPage: any) => IChunhiem;
