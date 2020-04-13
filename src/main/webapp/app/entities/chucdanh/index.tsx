import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import Chucdanh from './chucdanh';
import ChucdanhDetail from './chucdanh-detail';
import ChucdanhUpdate from './chucdanh-update';
import ChucdanhDeleteDialog from './chucdanh-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={ChucdanhUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={ChucdanhUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={ChucdanhDetail} />
      <ErrorBoundaryRoute path={match.url} component={Chucdanh} />
    </Switch>
    <ErrorBoundaryRoute path={`${match.url}/:id/delete`} component={ChucdanhDeleteDialog} />
  </>
);

export default Routes;
