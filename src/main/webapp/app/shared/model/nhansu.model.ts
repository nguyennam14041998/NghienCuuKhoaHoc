import { Moment } from 'moment';
import { IChunhiem } from 'app/shared/model/chunhiem.model';
import { INhansuthamgia } from 'app/shared/model/nhansuthamgia.model';

export interface INhansu {
  id?: number;
  manhansu?: string;
  tennhansu?: string;
  sdt?: number;
  email?: string;
  diachi?: string;
  namsinh?: string;
  ngaysinh?: Moment;
  sudung?: number;
  chunhiems?: IChunhiem[];
  nhansuthamgias?: INhansuthamgia[];
  donviId?: number;
  chucdanhId?: number;
  hochamId?: number;
  itemsPerPage?: number;
  sort?: string;
  order?: string;
  activePage?: number;

  nhansuid?: number;
  ma?: string;
  ten?: string;
  dienthoai?: number;
  diachiemail?: string;
  diachinhansu?: string;
  ngaysinhnhansu?: string;
  sd?: number;
  donvi?: number;
  chucdanh?: number;
  hocham?: number;
  ModalAdd?: boolean;
  filterTen?: string;
  filterMa?: string;
  filterChuyennganh?: string;
}

export const defaultValue: Readonly<INhansu> = {};
export declare const getSortState: (location: any, itemsPerPage: any) => INhansu;
