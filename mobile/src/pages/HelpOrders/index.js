import React from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';

import { Container, Content } from './styles';

export default function HelpOrders() {
  return (
    <Container>
      <Content />
    </Container>
  );
}

HelpOrders.navigationOptions = {
  tabBarLabel: 'Pedir ajuda',
  tabBarIcon: ({ tintColor }) => (
    <Icon name="live-help" size={20} color={tintColor} />
  ),
};
