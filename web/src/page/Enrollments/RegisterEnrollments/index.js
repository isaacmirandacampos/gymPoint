import React, { useState, useEffect } from 'react';
import { Form, Input } from '@rocketseat/unform';

import * as Yup from 'yup';
import { toast } from 'react-toastify';

import history from '../../../services/history';
import api from '../../../services/api';

import { Container } from '../../../styles/layoutsDefaults';

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
        <div className="big">
          <p>Nome do aluno</p>
          <Input
            type="name"
            autoFocus
            placeholder="Nome do aluno"
            name="name"
            required
          />
        </div>
        <div>
          <div>
            <p>Nome do plano</p>
            <Input type="text" placeholder="Plano" required name="title" />
          </div>
          <div>
            <p>data de inicio</p>
            <Input type="date" required name="start_date" />
          </div>
          <div className="read-only">
            <p>data final</p>
            <Input type="date" required name="start_date" readOnly />
          </div>
          <div className="read-only">
            <p>Valor final</p>
            <Input type="number" required name="start_date" readOnly />
          </div>
        </div>
        <button type="submit">Cadastrar</button>
      </Form>
    </Container>
  );
}
