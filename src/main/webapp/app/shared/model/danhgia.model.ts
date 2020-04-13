import { IDanhgiaCT } from 'app/shared/model/danhgia-ct.model';

export interface IDanhgia {
  id?: number;
  ma?: string;
  ten?: string;
  diem?: number;
  noidung?: string;
  sudung?: number;
  danhgiaCTS?: IDanhgiaCT[];
  detaiId?: number;
}

export const defaultValue: Readonly<IDanhgia> = {};
