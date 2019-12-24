import React, { useEffect, useState } from 'react';
import { FlatList } from 'react-native';
import { useSelector } from 'react-redux';
import { formatRelative, parseISO } from 'date-fns';
import pt from 'date-fns/locale/pt';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Header from '../../components/Header';
import api from '../../services/api';

import {
  Container,
  Content,
  SubmitButton,
  TextButton,
  ViewQuestion,
  Answer,
  DateText,
  Question,
  HeaderQuestion,
} from './styles';

export default function HelpOrders() {
  const [helpOrders, setHelpOrders] = useState([]);
  const id = useSelector(state => state.user.profile.id);

  useEffect(() => {
    async function loadQuestion() {
      const response = await api.get(`students/help-orders/${id}/all`);

      const array = await response.data.helpOrders.map(help => {
        help.formattedDate = formatRelative(
          parseISO(help.createdAt),
          new Date(),
          { locale: pt }
        );
        return help;
      });

      setHelpOrders(array);
    }
    loadQuestion();
  }, [id]);

  function handleAddHelpOrders() {}

  function renderHelpOrders({ item }) {
    return (
      <ViewQuestion>
        <HeaderQuestion>
          <Answer>Sem resposta</Answer>
          <DateText>{item.formattedDate}</DateText>
        </HeaderQuestion>

        <Question>{item.question}</Question>
      </ViewQuestion>
    );
  }

  console.tron.log(helpOrders);

  return (
    <Container>
      <Header />
      <Content>
        <SubmitButton>
          <TextButton onPress={handleAddHelpOrders}>Novo check-in</TextButton>
        </SubmitButton>
        <FlatList
          data={helpOrders}
          renderItem={renderHelpOrders}
          keyExtractor={item => String(item.id)}
        />
      </Content>
    </Container>
  );
}

HelpOrders.navigationOptions = {
  tabBarLabel: 'Pedir ajuda',
  tabBarIcon: ({ tintColor }) => (
    <Icon name="live-help" size={20} color={tintColor} />
  ),
};
