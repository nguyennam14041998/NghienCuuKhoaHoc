import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import Capdetai from './capdetai';
import CapdetaiDetail from './capdetai-detail';
import CapdetaiUpdate from './capdetai-update';
import CapdetaiDeleteDialog from './capdetai-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={CapdetaiUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={CapdetaiUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={CapdetaiDetail} />
      <ErrorBoundaryRoute path={match.url} component={Capdetai} />
    </Switch>
    <ErrorBoundaryRoute path={`${match.url}/:id/delete`} component={CapdetaiDeleteDialog} />
  </>
);

export default Routes;
