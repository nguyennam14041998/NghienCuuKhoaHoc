import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import Danhsachbaibao from './danhsachbaibao';
import DanhsachbaibaoDetail from './danhsachbaibao-detail';
import DanhsachbaibaoUpdate from './danhsachbaibao-update';
import DanhsachbaibaoDeleteDialog from './danhsachbaibao-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={DanhsachbaibaoUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={DanhsachbaibaoUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={DanhsachbaibaoDetail} />
      <ErrorBoundaryRoute path={match.url} component={Danhsachbaibao} />
    </Switch>
    <ErrorBoundaryRoute path={`${match.url}/:id/delete`} component={DanhsachbaibaoDeleteDialog} />
  </>
);

export default Routes;
