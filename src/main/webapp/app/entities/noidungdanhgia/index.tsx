import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import Noidungdanhgia from './noidungdanhgia';
import NoidungdanhgiaDetail from './noidungdanhgia-detail';
import NoidungdanhgiaUpdate from './noidungdanhgia-update';
import NoidungdanhgiaDeleteDialog from './noidungdanhgia-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={NoidungdanhgiaUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={NoidungdanhgiaUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={NoidungdanhgiaDetail} />
      <ErrorBoundaryRoute path={match.url} component={Noidungdanhgia} />
    </Switch>
    <ErrorBoundaryRoute path={`${match.url}/:id/delete`} component={NoidungdanhgiaDeleteDialog} />
  </>
);

export default Routes;
