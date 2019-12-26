import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Alert } from 'react-native';
import api from '../../../services/api';

import { Container, QuestionText, SubmitButton, TextButton } from './styles';

export default function New({ navigation }) {
  const [question, setQuestion] = useState('');
  const id = useSelector(state => state.user.profile.id);

  async function insertHelpOrder() {
    try {
      await api.post(`students/${id}/help-orders`, { question });
      Alert.alert('Sucesso', 'Pergunta enviada');
      navigation.navigate('ViewHelpOrders', { question });
    } catch (err) {
      Alert.alert('Falha', 'Ocorreu algum erro, tente novamente');
    }
  }

  return (
    <Container>
      <QuestionText onChangeText={setQuestion} value={question} />
      <SubmitButton onPress={insertHelpOrder}>
        <TextButton>Enviar pedido</TextButton>
      </SubmitButton>
    </Container>
  );
}
