import React from 'react';
import { Switch } from 'react-router-dom';
import Route from './Route';

import SignIn from '../page/SignIn';
import SignUp from '../page/SignUp';

import Students from '../page/Students';
import RegisterStudent from '../page/Students/RegisterStudent';
import Plans from '../page/Plans';
import Enrollments from '../page/Enrollments';
import HelpOrders from '../page/HelpOrders';

export default function Routes() {
  return (
    <Switch>
      <Route path="/" exact component={SignIn} />
      <Route path="/register" component={SignUp} />

      <Route path="/students" component={Students} isPrivate />
      <Route path="/register-student" component={RegisterStudent} isPrivate />

      <Route path="/plans" component={Plans} isPrivate />
      <Route path="/enrollments" component={Enrollments} isPrivate />
      <Route path="/help-orders" component={HelpOrders} isPrivate />
    </Switch>
  );
}
