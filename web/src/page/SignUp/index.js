import React from 'react';
import { useDispatch } from 'react-redux';
import { Form, Input } from '@rocketseat/unform';
import { Link } from 'react-router-dom';
import * as Yup from 'yup';

import { signUpRequest } from '../../store/modules/auth/actions';

import logo from '../../assets/logo.png';

const schema = Yup.object().shape({
  name: Yup.string().required('O nome e obrigatorio'),
  email: Yup.string()
    .email('Digite o seu email')
    .required('E-mail obrigatorio'),
  password: Yup.string()
    .min(6, 'No minimo 6 caracteres')
    .required('Senha obrigatoria'),
});

export default function SignUp() {
  const dispatch = useDispatch();
  function handleSubmit({ name, email, password }) {
    dispatch(signUpRequest(name, email, password));
  }

  return (
    <>
      <img src={logo} alt="Gympoint" />
      <Form schema={schema} onSubmit={handleSubmit}>
        <Input type="name" name="name" placeholder="Digite o seu nome" />
        <Input type="email" name="email" placeholder="Digite o seu e-mail" />
        <Input type="password" name="password" placeholder="Digite sua senha" />
        <button type="submit">Cadastrar</button>
        <Link to="/">Eu possuo uma conta</Link>
      </Form>
    </>
  );
}
