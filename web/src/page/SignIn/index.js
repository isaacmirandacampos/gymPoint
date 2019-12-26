import React from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { Form, Input } from '@rocketseat/unform';
import * as Yup from 'yup';

import { signInRequest } from '../../store/modules/auth/actions';

import logo from '../../assets/logo.png';

const schema = Yup.object().shape({
  email: Yup.string()
    .email('Digite seu e-mail')
    .required('O e-mail e obrigatorio'),
  password: Yup.string().required('A senha e obrigatoria'),
});

export default function SignIn() {
  const dispatch = useDispatch();

  async function handleSubmit({ email, password }, { resetForm }) {
    resetForm();
    dispatch(signInRequest(email, password));
  }

  return (
    <>
      <img src={logo} alt="gympoint" />
      <Form schema={schema} onSubmit={handleSubmit}>
        <Input type="email" placeholder="Digite seu e-mail" name="email" />
        <Input type="password" placeholder="Digite sua senha" name="password" />
        <button type="submit">Acessar</button>
        <Link to="/register">Criar uma conta gratuita</Link>
      </Form>
    </>
  );
}
