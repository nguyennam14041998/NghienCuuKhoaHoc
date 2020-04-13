import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import Tiendo from './tiendo';
import TiendoDetail from './tiendo-detail';
import TiendoUpdate from './tiendo-update';
import TiendoDeleteDialog from './tiendo-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={TiendoUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={TiendoUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={TiendoDetail} />
      <ErrorBoundaryRoute path={match.url} component={Tiendo} />
    </Switch>
    <ErrorBoundaryRoute path={`${match.url}/:id/delete`} component={TiendoDeleteDialog} />
  </>
);

export default Routes;
