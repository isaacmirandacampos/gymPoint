import { combineReducers } from 'redux';

import auth from './auth/reducer';
import user from './user/reducer';
import plan from './plan/reducer';
import student from './student/reducer';
import enrollment from './enrollment/reducer';
import helpOrders from './helpOrders/reducer';

export default combineReducers({
  auth,
  user,
  plan,
  student,
  enrollment,
  helpOrders,
});
