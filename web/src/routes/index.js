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
import EditPlans from '../page/Plans/EditPlans';

import Enrollments from '../page/Enrollments';
import RegisterEnrollments from '../page/Enrollments/RegisterEnrollments';
import EditEnrollments from '../page/Enrollments/EditEnrollments';

import HelpOrders from '../page/HelpOrders';

export default function Routes() {
  return (
    <Switch>
      <Route path="/" exact component={SignIn} />
      <Route path="/register" component={SignUp} />

      <Route path="/students" exact component={Students} isPrivate />
      <Route path="/students/register" component={RegisterStudent} isPrivate />
      <Route path="/students/edit/:id" component={EditStudent} isPrivate />

      <Route path="/plans" exact component={Plans} isPrivate />
      <Route path="/plans/register" component={RegisterPlans} isPrivate />
      <Route path="/plans/edit/:id" component={EditPlans} isPrivate />

      <Route path="/enrollments" exact component={Enrollments} isPrivate />
      <Route
        path="/enrollments/register"
        component={RegisterEnrollments}
        isPrivate
      />
      <Route
        path="/enrollments/edit/:id"
        component={EditEnrollments}
        isPrivate
      />

      <Route path="/help-orders" component={HelpOrders} isPrivate />
    </Switch>
  );
}
