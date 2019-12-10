import React from 'react';
import { Form, Input } from '@rocketseat/unform';

import * as Yup from 'yup';
import { toast } from 'react-toastify';

import history from '../../../services/history';
import api from '../../../services/api';

import { Container } from '../../../styles/register';

const schema = Yup.object().shape({
  name: Yup.string().required('nome obrigatorio'),
  email: Yup.string()
    .email('Deve ser um e-mail valido')
    .required('e-mail obrigatorio'),
  idade: Yup.number('Digite um numero').required('idade obrigatoria'),
  peso: Yup.number('Digite um numero').required('peso obrigatorio'),
  altura: Yup.number('Digite um numero').required('altura obrigatoria'),
});

export default function RegisterStudent() {
  async function handleRegister({ name, email, idade, peso, altura }) {
    try {
      await api.post('students', { name, email, idade, peso, altura });
      toast.success('Cadastrado com sucesso');
      history.push('/students');
    } catch (err) {
      toast.error('Falha no cadastramento, tente novamente');
    }
  }

  function handleBack() {
    history.push('/students');
  }

  return (
    <Container>
      <header>
        <h2>Gerenciando alunos</h2>
        <div>
          <button onClick={handleBack} id="back">
            Voltar
          </button>
        </div>
      </header>
      <Form schema={schema} onSubmit={handleRegister}>
        <Input
          className="bigInput"
          type="name"
          placeholder="Nome do aluno"
          name="name"
        />
        <Input
          className="bigInput"
          type="email"
          placeholder="E-mail do aluno"
          name="email"
        />
        <div>
          <Input
            type="number"
            step=".01"
            defaultValue={0}
            placeholder="Idade do aluno"
            required
            name="idade"
          />
          <Input
            type="number"
            step=".01"
            defaultValue={0}
            placeholder="Peso do aluno"
            required
            name="peso"
          />
          <Input
            type="number"
            step=".01"
            defaultValue={0}
            placeholder="Altura do aluno"
            required
            name="altura"
          />
        </div>
        <button type="submit">Cadastrar</button>
      </Form>
    </Container>
  );
}
