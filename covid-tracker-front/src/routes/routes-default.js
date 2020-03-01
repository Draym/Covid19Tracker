import React from 'react';
import {RoutesEndpoint} from "../utils/RoutesEndpoint";
import EAuthRole from "../utils/auth/EAuthRole";

const Dashboard = React.lazy(() => import('../web/views/Dashboard'));

const routes = [
  { path: RoutesEndpoint.DASHBOARD, exact: true, name: 'Dashboard', component: Dashboard, restricted: EAuthRole.NONE }
];

export default routes;

