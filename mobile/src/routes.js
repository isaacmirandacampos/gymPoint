import React from 'react';
import { View, Text } from 'react-native';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createBottomTabNavigator } from 'react-navigation-tabs';

import Header from './components/Header';

import SignIn from './pages/SignIn';

import Checkins from './pages/Checkins';
import HelpOrders from './pages/HelpOrders';

export default (signedIn = false) =>
  createAppContainer(
    createSwitchNavigator(
      {
        Sign: createSwitchNavigator({
          SignIn,
        }),
        App: createBottomTabNavigator(
          {
            Checkins,
            HelpOrders,
          },
          {
            tabBarOptions: {
              keyboardHidesTabBar: true,
              activeTintColor: '#fff',
              inactiveTintColor: 'rgba(255, 255, 255, 0.6)',
              style: {
                backgroundColor: '#ee4e62',
              },

            },
            defaultNavigationOptions: {
              header: (<View style={{flex: 1}}><Text>Teste</Text></View>),
            },
          }
        ),
      },
      { 

        initialRouteName: signedIn ? 'App' : 'Sign',
      }
    )
  );
