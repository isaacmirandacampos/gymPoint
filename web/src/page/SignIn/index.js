import React from 'react';
import { Form, Input } from '@rocketseat/unform';
import { Link } from 'react-router-dom';
import logo from '../../assets/logo.png';
import * as Yup from 'yup';

export default function SignIn() {
  const schema = Yup.object().shape({
    email: Yup.string()
      .email('Digite seu e-mail')
      .required('O e-mail e obrigatorio'),
    password: Yup.string().required('A senha e obrigatoria'),
  });
  async function handleSubmit(data) {
    const { email, password } = data;
    console.tron.log(data);
  }
  return (
    <>
      <img src={logo} alt="gympoint" />
      <Form schema={schema} onSubmit={handleSubmit}>
        <Input
          type="email"
          placeholder="Digite seu e-mail"
          name="email"
          id="email"
        />
        <Input
          type="password"
          placeholder="Digite sua senha"
          name="password"
          id="password"
        />
        <button type="submit">Entrar</button>
        <Link to="/register">Criar uma conta gratuita</Link>
      </Form>
    </>
  );
}
