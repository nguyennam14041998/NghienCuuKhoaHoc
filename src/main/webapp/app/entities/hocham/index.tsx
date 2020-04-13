import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import Hocham from './hocham';
import HochamDetail from './hocham-detail';
import HochamUpdate from './hocham-update';
import HochamDeleteDialog from './hocham-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={HochamUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={HochamUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={HochamDetail} />
      <ErrorBoundaryRoute path={match.url} component={Hocham} />
    </Switch>
    <ErrorBoundaryRoute path={`${match.url}/:id/delete`} component={HochamDeleteDialog} />
  </>
);

export default Routes;
