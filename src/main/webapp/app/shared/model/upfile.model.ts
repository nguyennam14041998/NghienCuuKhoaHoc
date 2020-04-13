import { Moment } from 'moment';

export interface IUpfile {
  id?: number;
  mota?: string;
  noidungContentType?: string;
  noidung?: any;
  thoigian?: Moment;
  detaiId?: number;
  tiendoId?: number;
}

export const defaultValue: Readonly<IUpfile> = {};
