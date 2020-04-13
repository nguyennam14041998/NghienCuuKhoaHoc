import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import Coquanphoihopthamgia from './coquanphoihopthamgia';
import CoquanphoihopthamgiaDetail from './coquanphoihopthamgia-detail';
import CoquanphoihopthamgiaUpdate from './coquanphoihopthamgia-update';
import CoquanphoihopthamgiaDeleteDialog from './coquanphoihopthamgia-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={CoquanphoihopthamgiaUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={CoquanphoihopthamgiaUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={CoquanphoihopthamgiaDetail} />
      <ErrorBoundaryRoute path={match.url} component={Coquanphoihopthamgia} />
    </Switch>
    <ErrorBoundaryRoute path={`${match.url}/:id/delete`} component={CoquanphoihopthamgiaDeleteDialog} />
  </>
);

export default Routes;
