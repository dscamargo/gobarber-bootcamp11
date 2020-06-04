import React from 'react';
import { Switch } from 'react-router-dom';
import Route from './Route';

import Signin from '../pages/Signin';
import Signup from '../pages/Signup';
import Dashboard from '../pages/Dashboard';
import ForgotPassword from '../pages/ForgotPassword';

const Routes: React.FC = () => (
  <Switch>
    <Route exact path="/" component={Signin} />
    <Route path="/signup" component={Signup} />
    <Route path="/dashboard" component={Dashboard} isPrivate />
    <Route path="/forgot-password" component={ForgotPassword} />
  </Switch>
);

export default Routes;
