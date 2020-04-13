import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import Nguonkinhphi from './nguonkinhphi';
import NguonkinhphiDetail from './nguonkinhphi-detail';
import NguonkinhphiUpdate from './nguonkinhphi-update';
import NguonkinhphiDeleteDialog from './nguonkinhphi-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={NguonkinhphiUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={NguonkinhphiUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={NguonkinhphiDetail} />
      <ErrorBoundaryRoute path={match.url} component={Nguonkinhphi} />
    </Switch>
    <ErrorBoundaryRoute path={`${match.url}/:id/delete`} component={NguonkinhphiDeleteDialog} />
  </>
);

export default Routes;
