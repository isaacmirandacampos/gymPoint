import React from 'react';
import Button from '../../components/Button';
import { Container, Content, Logo, InputLogin } from './styles';

export default function SignIn() {
  return (
    <Container>
      <Content>
        <Logo />
        <InputLogin autoComplete="off" keyboardType="number-pad" placeholder="Informe seu ID de cadastro" />
        <Button />
      </Content>
    </Container>
  );
}
