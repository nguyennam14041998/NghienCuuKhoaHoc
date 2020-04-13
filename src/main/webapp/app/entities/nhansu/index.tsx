import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import Nhansu from './nhansu';
import NhansuDetail from './nhansu-detail';
import NhansuUpdate from './nhansu-update';
import NhansuDeleteDialog from './nhansu-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={NhansuUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={NhansuUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={NhansuDetail} />
      <ErrorBoundaryRoute path={match.url} component={Nhansu} />
    </Switch>
    <ErrorBoundaryRoute path={`${match.url}/:id/delete`} component={NhansuDeleteDialog} />
  </>
);

export default Routes;
