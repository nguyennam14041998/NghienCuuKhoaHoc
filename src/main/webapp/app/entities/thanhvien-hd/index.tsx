import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import ThanhvienHD from './thanhvien-hd';
import ThanhvienHDDetail from './thanhvien-hd-detail';
import ThanhvienHDUpdate from './thanhvien-hd-update';
import ThanhvienHDDeleteDialog from './thanhvien-hd-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={ThanhvienHDUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={ThanhvienHDUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={ThanhvienHDDetail} />
      <ErrorBoundaryRoute path={match.url} component={ThanhvienHD} />
    </Switch>
    <ErrorBoundaryRoute path={`${match.url}/:id/delete`} component={ThanhvienHDDeleteDialog} />
  </>
);

export default Routes;
