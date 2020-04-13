import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import Detai from './detai';
import DetaiDetail from './detai-detail';
import DetaiUpdate from './detai-update';
import DetaiDeleteDialog from './detai-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={DetaiUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={DetaiUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={DetaiDetail} />
      <ErrorBoundaryRoute path={match.url} component={Detai} />
    </Switch>
    <ErrorBoundaryRoute path={`${match.url}/:id/delete`} component={DetaiDeleteDialog} />
  </>
);

export default Routes;
