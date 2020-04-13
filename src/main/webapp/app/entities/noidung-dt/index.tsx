import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import NoidungDT from './noidung-dt';
import NoidungDTDetail from './noidung-dt-detail';
import NoidungDTUpdate from './noidung-dt-update';
import NoidungDTDeleteDialog from './noidung-dt-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={NoidungDTUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={NoidungDTUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={NoidungDTDetail} />
      <ErrorBoundaryRoute path={match.url} component={NoidungDT} />
    </Switch>
    <ErrorBoundaryRoute path={`${match.url}/:id/delete`} component={NoidungDTDeleteDialog} />
  </>
);

export default Routes;
