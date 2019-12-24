import React from 'react';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import { createStackNavigator } from 'react-navigation-stack';
import Icon from 'react-native-vector-icons/MaterialIcons';

import Header from './components/Header';

import SignIn from './pages/SignIn';

import Checkins from './pages/Checkins';
import ViewHelpOrders from './pages/HelpOrders';
import NewHelpOrders from './pages/HelpOrders/New';
import DetailsHelpOrders from './pages/HelpOrders/Details';

export default (signedIn = false) =>
  createAppContainer(
    createSwitchNavigator(
      {
        Sign: createSwitchNavigator({
          SignIn,
        }),
        App: createBottomTabNavigator(
          {
            StudentCheckins: {
              screen: createStackNavigator({
                Checkins,
              },
              {
                navigationOptions: {
                  tabBarLabel: 'Checkins',
                  tabBarIcon: ({ tintColor }) => (
                    <Icon name="check-box" size={20} color={tintColor} />
                  ),
                },
                defaultNavigationOptions: {
                  headerBackground: <Header />,
                },
              }
              )
            },
            HelpOrders: {
              screen: createStackNavigator(
                {
                  ViewHelpOrders,
                  NewHelpOrders,
                  DetailsHelpOrders,
                },
                {
                  navigationOptions: {
                    tabBarLabel: 'Pedir ajuda',
                    tabBarIcon: ({ tintColor }) => (
                      <Icon name="live-help" size={20} color={tintColor} />
                    ),
                  },
                  defaultNavigationOptions: {
                    headerBackground: <Header />,
                    headerBackImage: () => (
                      <Icon name="chevron-left" size={22} color="#000" />
                    ),
                  },
                }
              ),
            },
          },
          { 
            resetOnBlur: true,
            tabBarOptions: {
              keyboardHidesTabBar: true,
              activeTintColor: '#fff',
              inactiveTintColor: 'rgba(255, 255, 255, 0.6)',
              style: {
                backgroundColor: '#ee4e62',
              },
            },
            defaultNavigationOptions: {
              headerBackground: <Header />,
            },
          }
        ),
      },
      {
        initialRouteName: signedIn ? 'App' : 'Sign',
      }
    )
  );
