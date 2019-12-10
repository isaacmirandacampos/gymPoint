import React from 'react';
import { Switch } from 'react-router-dom';
import Route from './Route';

import SignIn from '../page/SignIn';
import SignUp from '../page/SignUp';

import Students from '../page/Students';
import RegisterStudent from '../page/Students/RegisterStudent';
import EditStudent from '../page/Students/EditStudent';
import Plans from '../page/Plans';
import RegisterPlans from '../page/Plans/RegisterPlans';
import Enrollments from '../page/Enrollments';
import RegisterEnrollments from '../page/Enrollments/RegisterEnrollments';
import HelpOrders from '../page/HelpOrders';

export default function Routes() {
  return (
    <Switch>
      <Route path="/" exact component={SignIn} />
      <Route path="/register" component={SignUp} />

      <Route path="/students" component={Students} isPrivate />
      <Route path="/student-register" component={RegisterStudent} isPrivate />
      <Route path="/student-edit" component={EditStudent} isPrivate />

      <Route path="/plans" component={Plans} isPrivate />
      <Route path="/plans-register" component={RegisterPlans} isPrivate />

      <Route path="/enrollments" component={Enrollments} isPrivate />
      <Route
        path="/enrollments-register"
        component={RegisterEnrollments}
        isPrivate
      />

      <Route path="/help-orders" component={HelpOrders} isPrivate />
    </Switch>
  );
}
