import React from 'react';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createBottomTabNavigator } from 'react-navigation-tabs';

import SignIn from './pages/SignIn';

import Checkins from './pages/Checkins';
import HelpOrders from './pages/HelpOrders';

export default Routes = createAppContainer(
  createSwitchNavigator(
    {
      Sign: createSwitchNavigator({
        SignIn,
      }),
      App: createBottomTabNavigator({
        Checkins,
        HelpOrders,
      }),
    },
    {
      initialRouteName: 'Sign',
    }
  )
);
