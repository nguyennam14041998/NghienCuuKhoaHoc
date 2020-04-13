import { Moment } from 'moment';
import { ITiendo } from 'app/shared/model/tiendo.model';
import { IUpfile } from 'app/shared/model/upfile.model';
import { INhansuthamgia } from 'app/shared/model/nhansuthamgia.model';
import { INguonkinhphi } from 'app/shared/model/nguonkinhphi.model';
import { ICoquanphoihopthamgia } from 'app/shared/model/coquanphoihopthamgia.model';

export interface IDetai {
  id?: number;
  ma?: string;
  ten?: string;
  thoigiantao?: Moment;
  thoigianbatdau?: Moment;
  thoigianketthuc?: Moment;
  muctieu?: string;
  noidung?: string;
  tinhcapthiet?: number;
  ketqua?: string;
  xeploai?: number;
  trangthai?: number;
  sudung?: number;
  dutoanKPId?: number;
  danhgiaId?: number;
  tiendos?: ITiendo[];
  upfiles?: IUpfile[];
  nhansuthamgias?: INhansuthamgia[];
  nguonkinhphis?: INguonkinhphi[];
  coquanphoihopthamgias?: ICoquanphoihopthamgia[];
  linhvucId?: number;
  capdetaiId?: number;
  hoidongdanhgiaId?: number;
  chunhiemId?: number;
}

export const defaultValue: Readonly<IDetai> = {};
