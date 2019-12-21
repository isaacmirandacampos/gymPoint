import React from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { Text } from 'react-native';
import Header from '../../components/Header';

import { Container, Content } from './styles';

export default function HelpOrders() {
  return (
    <Container>
      <Header />
      <Content>
        <Text>Help</Text>
      </Content>
    </Container>
  );
}

HelpOrders.navigationOptions = {
  tabBarLabel: 'Pedir ajuda',
  tabBarIcon: ({ tintColor }) => (
    <Icon name="live-help" size={20} color={tintColor} />
  ),
  title: 'checkins',
};
