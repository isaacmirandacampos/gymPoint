import React from 'react';

import {
  Container,
  Content,
  HeaderQuestion,
  Title,
  DateText,
  Text,
} from './styles';

export default function Details({ navigation }) {
  const HelpOrder = navigation.getParam('item');
  return (
    <Container>
      <Content>
        <HeaderQuestion>
          <Title>Pergunta</Title>
          <DateText>{HelpOrder.formattedDate}</DateText>
        </HeaderQuestion>
        <Text>{HelpOrder.question}</Text>
        <Title>Resposta</Title>
        {HelpOrder.answer ? (
          <Text>{HelpOrder.answer}</Text>
        ) : (
          <Text>Ainda não foi respondido</Text>
        )}
      </Content>
    </Container>
  );
}
