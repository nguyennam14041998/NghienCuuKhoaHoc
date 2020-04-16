import React from 'react';
import { Switch } from 'react-router-dom';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import Donvi from './donvi';
import Linhvuc from './linhvuc';
import Capdetai from './capdetai';
import Chucdanh from './chucdanh';
import Hocham from './hocham';
import Nhansu from './nhansu';
import Nhansuthamgia from './nhansuthamgia';
import Chunhiem from './chunhiem';
import Coquanphoihop from './coquanphoihop';
import Coquanphoihopthamgia from './coquanphoihopthamgia';
import Nguonkinhphi from './nguonkinhphi';
import Detai from './detai';
import DutoanKP from './dutoan-kp';
import DutoanKPCT from './dutoan-kpct';
import NoidungDT from './noidung-dt';
import Tiendo from './tiendo';
import Danhgia from './danhgia';
import DanhgiaCT from './danhgia-ct';
import Noidungdanhgia from './noidungdanhgia';
import Hoidongdanhgia from './hoidongdanhgia';
import ThanhvienHD from './thanhvien-hd';
import Upfile from './upfile';
import Danhsachbaibao from './danhsachbaibao';
/* jhipster-needle-add-route-import - JHipster will add routes here */

const Routes = ({ match }) => (
  <div>
    <Switch>
      {/* prettier-ignore */}
      <ErrorBoundaryRoute path={`${match.url}donvi`} component={Donvi} />
      <ErrorBoundaryRoute path={`${match.url}linhvuc`} component={Linhvuc} />
      <ErrorBoundaryRoute path={`${match.url}capdetai`} component={Capdetai} />
      <ErrorBoundaryRoute path={`${match.url}chucdanh`} component={Chucdanh} />
      <ErrorBoundaryRoute path={`${match.url}hocham`} component={Hocham} />
      <ErrorBoundaryRoute path={`${match.url}nhansu`} component={Nhansu} />
      <ErrorBoundaryRoute path={`${match.url}nhansuthamgia`} component={Nhansuthamgia} />
      <ErrorBoundaryRoute path={`${match.url}chunhiem`} component={Chunhiem} />
      <ErrorBoundaryRoute path={`${match.url}coquanphoihop`} component={Coquanphoihop} />
      <ErrorBoundaryRoute path={`${match.url}coquanphoihopthamgia`} component={Coquanphoihopthamgia} />
      <ErrorBoundaryRoute path={`${match.url}nguonkinhphi`} component={Nguonkinhphi} />
      <ErrorBoundaryRoute path={`${match.url}detai`} component={Detai} />
      <ErrorBoundaryRoute path={`${match.url}dutoan-kp`} component={DutoanKP} />
      <ErrorBoundaryRoute path={`${match.url}dutoan-kpct`} component={DutoanKPCT} />
      <ErrorBoundaryRoute path={`${match.url}noidung-dt`} component={NoidungDT} />
      <ErrorBoundaryRoute path={`${match.url}tiendo`} component={Tiendo} />
      <ErrorBoundaryRoute path={`${match.url}danhgia`} component={Danhgia} />
      <ErrorBoundaryRoute path={`${match.url}danhgia-ct`} component={DanhgiaCT} />
      <ErrorBoundaryRoute path={`${match.url}noidungdanhgia`} component={Noidungdanhgia} />
      <ErrorBoundaryRoute path={`${match.url}hoidongdanhgia`} component={Hoidongdanhgia} />
      <ErrorBoundaryRoute path={`${match.url}thanhvien-hd`} component={ThanhvienHD} />
      <ErrorBoundaryRoute path={`${match.url}upfile`} component={Upfile} />
      <ErrorBoundaryRoute path={`${match.url}danhsachbaibao`} component={Danhsachbaibao} />
      {/* jhipster-needle-add-route-path - JHipster will add routes here */}
    </Switch>
  </div>
);

export default Routes;
