import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import DutoanKPCT from './dutoan-kpct';
import DutoanKPCTDetail from './dutoan-kpct-detail';
import DutoanKPCTUpdate from './dutoan-kpct-update';
import DutoanKPCTDeleteDialog from './dutoan-kpct-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={DutoanKPCTUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={DutoanKPCTUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={DutoanKPCTDetail} />
      <ErrorBoundaryRoute path={match.url} component={DutoanKPCT} />
    </Switch>
    <ErrorBoundaryRoute path={`${match.url}/:id/delete`} component={DutoanKPCTDeleteDialog} />
  </>
);

export default Routes;
