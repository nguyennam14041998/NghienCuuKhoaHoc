import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import DutoanKP from './dutoan-kp';
import DutoanKPDetail from './dutoan-kp-detail';
import DutoanKPUpdate from './dutoan-kp-update';
import DutoanKPDeleteDialog from './dutoan-kp-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={DutoanKPUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={DutoanKPUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={DutoanKPDetail} />
      <ErrorBoundaryRoute path={match.url} component={DutoanKP} />
    </Switch>
    <ErrorBoundaryRoute path={`${match.url}/:id/delete`} component={DutoanKPDeleteDialog} />
  </>
);

export default Routes;
