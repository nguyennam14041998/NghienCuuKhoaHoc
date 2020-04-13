import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import Coquanphoihop from './coquanphoihop';
import CoquanphoihopDetail from './coquanphoihop-detail';
import CoquanphoihopUpdate from './coquanphoihop-update';
import CoquanphoihopDeleteDialog from './coquanphoihop-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={CoquanphoihopUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={CoquanphoihopUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={CoquanphoihopDetail} />
      <ErrorBoundaryRoute path={match.url} component={Coquanphoihop} />
    </Switch>
    <ErrorBoundaryRoute path={`${match.url}/:id/delete`} component={CoquanphoihopDeleteDialog} />
  </>
);

export default Routes;
