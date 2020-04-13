import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import Nhansuthamgia from './nhansuthamgia';
import NhansuthamgiaDetail from './nhansuthamgia-detail';
import NhansuthamgiaUpdate from './nhansuthamgia-update';
import NhansuthamgiaDeleteDialog from './nhansuthamgia-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={NhansuthamgiaUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={NhansuthamgiaUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={NhansuthamgiaDetail} />
      <ErrorBoundaryRoute path={match.url} component={Nhansuthamgia} />
    </Switch>
    <ErrorBoundaryRoute path={`${match.url}/:id/delete`} component={NhansuthamgiaDeleteDialog} />
  </>
);

export default Routes;
