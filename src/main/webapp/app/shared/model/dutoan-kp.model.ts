import { IDutoanKPCT } from 'app/shared/model/dutoan-kpct.model';

export interface IDutoanKP {
  id?: number;
  madutoan?: string;
  tendutoan?: string;
  noidung?: string;
  sudung?: number;
  dutoanKPCTS?: IDutoanKPCT[];
  detaiId?: number;
}

export const defaultValue: Readonly<IDutoanKP> = {};
