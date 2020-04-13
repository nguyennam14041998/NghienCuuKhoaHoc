import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import Chunhiem from './chunhiem';
import ChunhiemDetail from './chunhiem-detail';
import ChunhiemUpdate from './chunhiem-update';
import ChunhiemDeleteDialog from './chunhiem-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={ChunhiemUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={ChunhiemUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={ChunhiemDetail} />
      <ErrorBoundaryRoute path={match.url} component={Chunhiem} />
    </Switch>
    <ErrorBoundaryRoute path={`${match.url}/:id/delete`} component={ChunhiemDeleteDialog} />
  </>
);

export default Routes;
