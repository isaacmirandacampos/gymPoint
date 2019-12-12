import React, { useState, useEffect } from 'react';
import { Form, Input } from '@rocketseat/unform';

import * as Yup from 'yup';
import { toast } from 'react-toastify';

import history from '../../../services/history';
import api from '../../../services/api';

import { Container } from '../../../styles/register';

const schema = Yup.object().shape({
  name: Yup.string().required('Nome do estudante e obrigatorio'),
  title: Yup.string('Nome do plano').required('Nome e obrigatorio'),
  start_date: Yup.date('Digite a data de inicio').required('Data obrigatoria'),
});

export default function RegisterPlans() {
  async function handleRegister({ name, title, start_date }) {
    try {
      await api.post('enrollments', {
        name,
        title,
        start_date,
      });
      toast.success('Matricula do cadastrado com sucesso');
      history.push('/enrollments');
    } catch (err) {
      toast.error('Falha no cadastramento da matricula, tente novamente');
    }
  }

  function handleBack() {
    history.push('/enrollments');
  }

  return (
    <Container>
      <header>
        <h2>Gerenciamento de matricula</h2>
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
          required
        />
        <div>
          <Input type="text" placeholder="Plano" required name="title" />
          <Input
            type="date"
            placeholder="Data de inicio"
            required
            name="start_date"
          />
        </div>
        <button type="submit">Cadastrar</button>
      </Form>
    </Container>
  );
}
