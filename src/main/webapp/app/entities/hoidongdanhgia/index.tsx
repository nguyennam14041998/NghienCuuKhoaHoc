import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import Hoidongdanhgia from './hoidongdanhgia';
import HoidongdanhgiaDetail from './hoidongdanhgia-detail';
import HoidongdanhgiaUpdate from './hoidongdanhgia-update';
import HoidongdanhgiaDeleteDialog from './hoidongdanhgia-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={HoidongdanhgiaUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={HoidongdanhgiaUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={HoidongdanhgiaDetail} />
      <ErrorBoundaryRoute path={match.url} component={Hoidongdanhgia} />
    </Switch>
    <ErrorBoundaryRoute path={`${match.url}/:id/delete`} component={HoidongdanhgiaDeleteDialog} />
  </>
);

export default Routes;
