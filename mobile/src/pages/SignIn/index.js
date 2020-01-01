import React, { useState } from 'react';
import { ActivityIndicator } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import {
  Container,
  Content,
  Logo,
  InputLogin,
  SubmitButton,
  TextButton,
} from './styles';
import { signInRequest } from '../../store/modules/auth/actions';

export default function SignIn() {
  const [id, setId] = useState();
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.auth.loading);
  function handleSubmit() {
    dispatch(signInRequest(id));
  }
  return (
    <Container>
      <Content>
        <Logo />
        <InputLogin
          autoCapitalize="none"
          autoComplete="off"
          keyboardType="numeric"
          returnKetType="send"
          onSubmitEditing={handleSubmit}
          placeholder="Informe seu ID de cadastro"
          value={id}
          onChangeText={setId}
        />
        {loading ? (
          <SubmitButton>
            <ActivityIndicator />
          </SubmitButton>
        ) : (
          <SubmitButton onPress={handleSubmit}>
            <TextButton>Entrar no sistema</TextButton>
          </SubmitButton>
        )}
      </Content>
    </Container>
  );
}
