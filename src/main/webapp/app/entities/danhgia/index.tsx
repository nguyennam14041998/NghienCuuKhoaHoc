import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import Danhgia from './danhgia';
import DanhgiaDetail from './danhgia-detail';
import DanhgiaUpdate from './danhgia-update';
import DanhgiaDeleteDialog from './danhgia-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={DanhgiaUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={DanhgiaUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={DanhgiaDetail} />
      <ErrorBoundaryRoute path={match.url} component={Danhgia} />
    </Switch>
    <ErrorBoundaryRoute path={`${match.url}/:id/delete`} component={DanhgiaDeleteDialog} />
  </>
);

export default Routes;
