import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import Linhvuc from './linhvuc';
import LinhvucDetail from './linhvuc-detail';
import LinhvucUpdate from './linhvuc-update';
import LinhvucDeleteDialog from './linhvuc-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={LinhvucUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={LinhvucUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={LinhvucDetail} />
      <ErrorBoundaryRoute path={match.url} component={Linhvuc} />
    </Switch>
    <ErrorBoundaryRoute path={`${match.url}/:id/delete`} component={LinhvucDeleteDialog} />
  </>
);

export default Routes;
