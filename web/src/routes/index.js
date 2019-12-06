import React from 'react';
import { Switch } from 'react-router-dom';
import Route from './Route';

import SignIn from '../page/SignIn';
import SignUp from '../page/SignUp';

import Dashboard from '../page/Dashboard';

export default function Routes() {
  return (
    <Switch>
      <Route path="/" exact component={SignIn} />
      <Route path="/register" component={SignUp} />

      <Route path="/dashboard" component={Dashboard} isPrivate />
    </Switch>
  );
}
