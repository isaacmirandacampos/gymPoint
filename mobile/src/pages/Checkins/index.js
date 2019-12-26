import React, { useState, useEffect } from 'react';
import { Alert } from 'react-native';
import { useSelector } from 'react-redux';
import { formatRelative, parseISO } from 'date-fns';
import pt from 'date-fns/locale/pt';

import api from '../../services/api';

import {
  Container,
  Content,
  SubmitButton,
  TextButton,
  ColumnCheckins,
  Checkin,
  Qtd,
  TextDate,
} from './styles';

export default function Checkins() {
  const id = useSelector(state => state.user.profile.id);
  const [checkins, setCheckins] = useState([]);
  const [newCheckins, setNewCheckins] = useState([]);

  useEffect(() => {
    async function loadCheckins() {
      if (checkins === []) {
        const array = newCheckins.concat(checkins);
        setCheckins(array);
      } else {
        const response = await api.get(`students/${id}/checkins`);
        const newArray = response.data.checkins.map(checkin => {
          checkin.formattedDate = formatRelative(
            parseISO(checkin.createdAt),
            new Date(),
            { locale: pt }
          );
          return checkin;
        });

        setCheckins(newArray);
      }
    }

    loadCheckins();
  }, [id, newCheckins]);

  function renderCheckins({ item, index }) {
    return (
      <Checkin>
        <Qtd>Checkin-in #{index + 1}</Qtd>
        <TextDate>{item.formattedDate}</TextDate>
      </Checkin>
    );
  }

  async function handleCheckin() {
    try {
      const response = await api.post(`students/${id}/checkins`);
      setNewCheckins(response.data);
      return Alert.alert('Sucesso', 'Check-in registrado com sucesso');
    } catch (err) {
      return Alert.alert(
        'Falha na tentativa',
        'O máximo de check-ins atingidos na semana'
      );
    }
  }

  return (
    <Container>
      <Content>
        <SubmitButton onPress={handleCheckin}>
          <TextButton>Novo check-in</TextButton>
        </SubmitButton>
        <ColumnCheckins
          data={checkins}
          keyExtractor={item => String(item.id)}
          renderItem={renderCheckins}
        />
      </Content>
    </Container>
  );
}
