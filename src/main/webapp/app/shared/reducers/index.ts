import { combineReducers } from 'redux';
import { loadingBarReducer as loadingBar } from 'react-redux-loading-bar';

import locale, { LocaleState } from './locale';
import authentication, { AuthenticationState } from './authentication';
import applicationProfile, { ApplicationProfileState } from './application-profile';

import administration, { AdministrationState } from 'app/modules/administration/administration.reducer';
import userManagement, { UserManagementState } from 'app/modules/administration/user-management/user-management.reducer';
import register, { RegisterState } from 'app/modules/account/register/register.reducer';
import activate, { ActivateState } from 'app/modules/account/activate/activate.reducer';
import password, { PasswordState } from 'app/modules/account/password/password.reducer';
import settings, { SettingsState } from 'app/modules/account/settings/settings.reducer';
import passwordReset, { PasswordResetState } from 'app/modules/account/password-reset/password-reset.reducer';
// prettier-ignore
import donvi, {
  DonviState
} from 'app/entities/donvi/donvi.reducer';
// prettier-ignore
import linhvuc, {
  LinhvucState
} from 'app/entities/linhvuc/linhvuc.reducer';
// prettier-ignore
import capdetai, {
  CapdetaiState
} from 'app/entities/capdetai/capdetai.reducer';
// prettier-ignore
import chucdanh, {
  ChucdanhState
} from 'app/entities/chucdanh/chucdanh.reducer';
// prettier-ignore
import hocham, {
  HochamState
} from 'app/entities/hocham/hocham.reducer';
// prettier-ignore
import nhansu, {
  NhansuState
} from 'app/entities/nhansu/nhansu.reducer';
// prettier-ignore
import nhansuthamgia, {
  NhansuthamgiaState
} from 'app/entities/nhansuthamgia/nhansuthamgia.reducer';
// prettier-ignore
import chunhiem, {
  ChunhiemState
} from 'app/entities/chunhiem/chunhiem.reducer';
// prettier-ignore
import coquanphoihop, {
  CoquanphoihopState
} from 'app/entities/coquanphoihop/coquanphoihop.reducer';
// prettier-ignore
import coquanphoihopthamgia, {
  CoquanphoihopthamgiaState
} from 'app/entities/coquanphoihopthamgia/coquanphoihopthamgia.reducer';
// prettier-ignore
import nguonkinhphi, {
  NguonkinhphiState
} from 'app/entities/nguonkinhphi/nguonkinhphi.reducer';
// prettier-ignore
import detai, {
  DetaiState
} from 'app/entities/detai/detai.reducer';
// prettier-ignore
import dutoanKP, {
  DutoanKPState
} from 'app/entities/dutoan-kp/dutoan-kp.reducer';
// prettier-ignore
import dutoanKPCT, {
  DutoanKPCTState
} from 'app/entities/dutoan-kpct/dutoan-kpct.reducer';
// prettier-ignore
import noidungDT, {
  NoidungDTState
} from 'app/entities/noidung-dt/noidung-dt.reducer';
// prettier-ignore
import tiendo, {
  TiendoState
} from 'app/entities/tiendo/tiendo.reducer';
// prettier-ignore
import danhgia, {
  DanhgiaState
} from 'app/entities/danhgia/danhgia.reducer';
// prettier-ignore
import danhgiaCT, {
  DanhgiaCTState
} from 'app/entities/danhgia-ct/danhgia-ct.reducer';
// prettier-ignore
import noidungdanhgia, {
  NoidungdanhgiaState
} from 'app/entities/noidungdanhgia/noidungdanhgia.reducer';
// prettier-ignore
import hoidongdanhgia, {
  HoidongdanhgiaState
} from 'app/entities/hoidongdanhgia/hoidongdanhgia.reducer';
// prettier-ignore
import thanhvienHD, {
  ThanhvienHDState
} from 'app/entities/thanhvien-hd/thanhvien-hd.reducer';
// prettier-ignore
import upfile, {
  UpfileState
} from 'app/entities/upfile/upfile.reducer';
/* jhipster-needle-add-reducer-import - JHipster will add reducer here */

export interface IRootState {
  readonly authentication: AuthenticationState;
  readonly locale: LocaleState;
  readonly applicationProfile: ApplicationProfileState;
  readonly administration: AdministrationState;
  readonly userManagement: UserManagementState;
  readonly register: RegisterState;
  readonly activate: ActivateState;
  readonly passwordReset: PasswordResetState;
  readonly password: PasswordState;
  readonly settings: SettingsState;
  readonly donvi: DonviState;
  readonly linhvuc: LinhvucState;
  readonly capdetai: CapdetaiState;
  readonly chucdanh: ChucdanhState;
  readonly hocham: HochamState;
  readonly nhansu: NhansuState;
  readonly nhansuthamgia: NhansuthamgiaState;
  readonly chunhiem: ChunhiemState;
  readonly coquanphoihop: CoquanphoihopState;
  readonly coquanphoihopthamgia: CoquanphoihopthamgiaState;
  readonly nguonkinhphi: NguonkinhphiState;
  readonly detai: DetaiState;
  readonly dutoanKP: DutoanKPState;
  readonly dutoanKPCT: DutoanKPCTState;
  readonly noidungDT: NoidungDTState;
  readonly tiendo: TiendoState;
  readonly danhgia: DanhgiaState;
  readonly danhgiaCT: DanhgiaCTState;
  readonly noidungdanhgia: NoidungdanhgiaState;
  readonly hoidongdanhgia: HoidongdanhgiaState;
  readonly thanhvienHD: ThanhvienHDState;
  readonly upfile: UpfileState;
  /* jhipster-needle-add-reducer-type - JHipster will add reducer type here */
  readonly loadingBar: any;
}

const rootReducer = combineReducers<IRootState>({
  authentication,
  locale,
  applicationProfile,
  administration,
  userManagement,
  register,
  activate,
  passwordReset,
  password,
  settings,
  donvi,
  linhvuc,
  capdetai,
  chucdanh,
  hocham,
  nhansu,
  nhansuthamgia,
  chunhiem,
  coquanphoihop,
  coquanphoihopthamgia,
  nguonkinhphi,
  detai,
  dutoanKP,
  dutoanKPCT,
  noidungDT,
  tiendo,
  danhgia,
  danhgiaCT,
  noidungdanhgia,
  hoidongdanhgia,
  thanhvienHD,
  upfile,
  /* jhipster-needle-add-reducer-combine - JHipster will add reducer here */
  loadingBar
});

export default rootReducer;
