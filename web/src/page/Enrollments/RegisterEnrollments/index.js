import React, { useState, useEffect } from 'react';
import { Form, Input, Select } from '@rocketseat/unform';

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
  const [students, setStudents] = useState();
  const [plans, setPlans] = useState();

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

  useEffect(() => {
    async function getStudents() {
      const response = await api.get('enrollments/3');
      const { students } = response.data;
      const arrayStudents = students.map(student => {
        const title = student.name;
        const { id } = student;
        return (student = { id, title });
      });
      setStudents(arrayStudents);
    }
    async function getPlans() {
      const response = await api.get('plans');
      const { Plans } = response.data;
      setPlans(Plans);
    }
    getStudents();
    getPlans();
  }, []);

  function handleBack() {
    history.push('/enrollments');
  }
  console.tron.log(students);
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
      <Form onSubmit={handleRegister}>
        <div className="big">
          <p>Nome do aluno</p>
          <input name="name" options={students} />
        </div>
        <div>
          <div>
            <p>Nome do plano</p>
            <input name="title" options={plans} />
          </div>
          <div>
            <p>data de inicio</p>
            <Input type="date" required name="start_date" />
          </div>
          <div className="read-only">
            <p>data final</p>
            <Input type="date" required name="final_date" readOnly />
          </div>
          <div className="read-only">
            <p>Valor total</p>
            <Input type="number" required name="total_price" readOnly />
          </div>
        </div>
        <button type="submit">Cadastrar</button>
      </Form>
    </Container>
  );
}
