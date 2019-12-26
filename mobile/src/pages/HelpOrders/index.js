import React, { useEffect, useState } from 'react';
import { FlatList } from 'react-native';
import { useSelector } from 'react-redux';
import { formatRelative, parseISO } from 'date-fns';
import pt from 'date-fns/locale/pt';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { withNavigationFocus } from 'react-navigation';

import api from '../../services/api';

import {
  Container,
  Content,
  SubmitButton,
  TextButton,
  ButtonQuestion,
  Check,
  Answer,
  DateText,
  Question,
  HeaderQuestion,
} from './styles';

function HelpOrders({ navigation, isFocused }) {
  const [helpOrders, setHelpOrders] = useState([]);
  const id = useSelector(state => state.user.profile.id);

  async function loadQuestion() {
    const response = await api.get(`students/help-orders/all/${id}`);

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

  useEffect(() => {
    if (isFocused) {
      loadQuestion();
    }
  }, [isFocused]);

  function handleAddHelpOrders() {
    navigation.navigate('NewHelpOrders');
  }

  function handleDetails(item) {
    navigation.navigate('DetailsHelpOrders', { item });
  }

  function renderHelpOrders({ item }) {
    return (
      <ButtonQuestion onPress={() => handleDetails(item)}>
        <HeaderQuestion>
          {item.answer ? (
            <Check>
              <Icon name="check-circle" size={20} color="#66dd66" />
              <Answer answer={item.answer}>Respondida</Answer>
            </Check>
          ) : (
            <Check>
              <Icon name="check-circle" size={20} color="#999" />
              <Answer>Sem resposta</Answer>
            </Check>
          )}

          <DateText>{item.formattedDate}</DateText>
        </HeaderQuestion>

        <Question>{item.question}</Question>
      </ButtonQuestion>
    );
  }

  return (
    <Container>
      <Content>
        <SubmitButton onPress={handleAddHelpOrders}>
          <TextButton>Solicitar auxílio</TextButton>
        </SubmitButton>
        <FlatList
          data={helpOrders}
          renderItem={renderHelpOrders}
          keyExtractor={item => String(item.id)}
          showsVerticalScrollIndicator={false}
        />
      </Content>
    </Container>
  );
}

export default withNavigationFocus(HelpOrders);
