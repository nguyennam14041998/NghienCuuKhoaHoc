import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import DanhgiaCT from './danhgia-ct';
import DanhgiaCTDetail from './danhgia-ct-detail';
import DanhgiaCTUpdate from './danhgia-ct-update';
import DanhgiaCTDeleteDialog from './danhgia-ct-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={DanhgiaCTUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={DanhgiaCTUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={DanhgiaCTDetail} />
      <ErrorBoundaryRoute path={match.url} component={DanhgiaCT} />
    </Switch>
    <ErrorBoundaryRoute path={`${match.url}/:id/delete`} component={DanhgiaCTDeleteDialog} />
  </>
);

export default Routes;
