import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import Upfile from './upfile';
import UpfileDetail from './upfile-detail';
import UpfileUpdate from './upfile-update';
import UpfileDeleteDialog from './upfile-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={UpfileUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={UpfileUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={UpfileDetail} />
      <ErrorBoundaryRoute path={match.url} component={Upfile} />
    </Switch>
    <ErrorBoundaryRoute path={`${match.url}/:id/delete`} component={UpfileDeleteDialog} />
  </>
);

export default Routes;
