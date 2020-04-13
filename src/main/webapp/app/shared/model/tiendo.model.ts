import { Moment } from 'moment';
import { IUpfile } from 'app/shared/model/upfile.model';

export interface ITiendo {
  id?: number;
  matiendo?: string;
  kybaocao?: string;
  noidung?: string;
  thoigianbatdau?: Moment;
  thoigianketthuc?: Moment;
  khoiluonghoanthanh?: number;
  ghichu?: string;
  sudung?: number;
  upfiles?: IUpfile[];
  detaiId?: number;
}

export const defaultValue: Readonly<ITiendo> = {};
