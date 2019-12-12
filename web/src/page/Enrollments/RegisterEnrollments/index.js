import React, { useState, useEffect } from 'react';
import { Form, Input } from '@rocketseat/unform';

import * as Yup from 'yup';
import { toast } from 'react-toastify';

import history from '../../../services/history';
import api from '../../../services/api';

import { Container } from '../../../styles/register';

const schema = Yup.object().shape({
  title: Yup.string().required('Nome obrigatorio'),
  duration: Yup.number('Duracao em meses').required('duracao e obrigatorio'),
  price: Yup.number('Digite o valor por mes').required('Preco obrigatorio'),
});

export default function RegisterPlans() {
  async function handleRegister({ student, plan, start_date }) {
    try {
      await api.post('enrollments', { student, plan, start_date });
      toast.success('Plano cadastrado com sucesso');
      history.push('/plans');
    } catch (err) {
      toast.error('Falha no cadastramento do plano, tente novamente');
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
          name="student"
          required
        />
        <div>
          <Input type="text" placeholder="Plano" required name="plan" />
          <Input
            type="date"
            placeholder="Data de inicio"
            required
            name="start_date"
          />
          <Input
            type="date"
            placeholder="Data Final"
            required
            readOnly
            name="finalDate"
          />
          <Input
            type="number"
            placeholder="Valor Final"
            required
            readOnly
            name="finalValue"
          />
        </div>
        <button type="submit">Cadastrar</button>
      </Form>
    </Container>
  );
}
