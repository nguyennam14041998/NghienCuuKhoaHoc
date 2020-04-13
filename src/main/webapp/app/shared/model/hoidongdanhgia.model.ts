import { IDetai } from 'app/shared/model/detai.model';
import { IThanhvienHD } from 'app/shared/model/thanhvien-hd.model';

export interface IHoidongdanhgia {
  id?: number;
  mahoidong?: string;
  tenhoidong?: string;
  sudung?: number;
  detais?: IDetai[];
  thanhvienHDS?: IThanhvienHD[];
  itemsPerPage?: number;
  sort?: string;
  order?: string;
  activePage?: number;

  ModalAdd?: boolean;
  ten?: string;
  ma?: string;
  sd?: number;
  hoidongid?: number;
  filterTen?: string;
  filterMa?: string;
  filterHoidong?: string;
  sapxep?: string;
  ModalAddthanhvien?: boolean;
  tenTV?: string;
  donviTV?: string;
  trachnhiemTV?: number;
}

export const defaultValue: Readonly<IHoidongdanhgia> = {};
export declare const getSortState: (location: any, itemsPerPage: any) => IHoidongdanhgia;
