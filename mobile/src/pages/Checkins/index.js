import React from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { Text } from 'react-native';
import Header from '../../components/Header';

import { Container, Content } from './styles';

export default function Checkins() {
  return (
    <Container>
      <Header />
      <Content>
        <Text>Checkinssssss</Text>
      </Content>
    </Container>
  );
}

Checkins.navigationOptions = {
  tabBarLabel: 'Check-ins',
  tabBarIcon: ({ tintColor }) => (
    <Icon name="check-box" size={20} color={tintColor} />
  ),
  header: <Header />,
};
