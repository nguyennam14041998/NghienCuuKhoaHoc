import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import Donvi from './donvi';
import DonviDetail from './donvi-detail';
import DonviUpdate from './donvi-update';
import DonviDeleteDialog from './donvi-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={DonviUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={DonviUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={DonviDetail} />
      <ErrorBoundaryRoute path={match.url} component={Donvi} />
    </Switch>
    <ErrorBoundaryRoute path={`${match.url}/:id/delete`} component={DonviDeleteDialog} />
  </>
);

export default Routes;
