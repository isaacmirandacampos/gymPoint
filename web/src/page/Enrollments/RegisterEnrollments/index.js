import React, { useState, useEffect } from 'react';
import { Form, Input, Select } from '@rocketseat/unform';
import { addMonths, parseISO, getDate, getMonth, getYear } from 'date-fns';

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
  const [students, setStudents] = useState([]);
  const [plans, setPlans] = useState([]);
  const [idPlan, setIdPlan] = useState();
  const [idStudent, setIdStudent] = useState();
  const [startDate, setStartDate] = useState();
  const [endDate, setEndDate] = useState('dd/mm/yyyy');
  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    const i = plans.findIndex(plan => plan.id == idPlan);
    const durationChoose = plans.map(p => {
      if (p.id == idPlan) return p.duration;
    });
    const priceChoose = plans.map(p => {
      if (p.id == idPlan) return p.price;
    });

    const finalPrice = priceChoose[i] * durationChoose[i];

    setTotalPrice(finalPrice);
    const finalDate = addMonths(parseISO(startDate), durationChoose[i]);
    if (durationChoose && startDate) {
      const day = getDate(finalDate);
      const month = getMonth(finalDate);
      const year = getYear(finalDate);
      setEndDate(`${day}/${month + 1}/${year}`);
    }
  }, [startDate, idPlan, plans]);

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

  async function handleRegister({ student_id, plan_id, start_date }) {
    try {
      console.tron.log();
      await api.post('enrollments', {
        student_id,
        plan_id,
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
      <Form onSubmit={handleRegister}>
        <div className="big">
          <p>Nome do aluno</p>
          <Select
            name="student_id"
            onChange={e => setIdStudent(e.target.value)}
            options={students}
          />
        </div>
        <div>
          <div>
            <p>Nome do plano</p>
            <Select
              name="plan_id"
              onChange={e => setIdPlan(e.target.value)}
              options={plans}
            />
          </div>
          <div>
            <p>data de inicio</p>
            <Input
              type="date"
              onChange={e => setStartDate(e.target.value)}
              required
              name="start_date"
            />
          </div>
          <div className="read-only">
            <p>data final</p>
            <Input
              type="text"
              value={endDate == 'NaN/NaN/NaN' ? 'dd/mm/yyyy' : endDate}
              required
              name="final_date"
              readOnly
            />
          </div>
          <div className="read-only">
            <p>Valor total</p>
            <Input
              type="text"
              value={totalPrice}
              required
              name="total_price"
              readOnly
            />
          </div>
        </div>
        <button type="submit">Cadastrar</button>
      </Form>
    </Container>
  );
}
