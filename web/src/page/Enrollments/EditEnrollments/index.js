import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Form, Input, Select } from '@rocketseat/unform';
import { addMonths, getDate, getMonth, getYear, parseISO } from 'date-fns';

import * as Yup from 'yup';
import { toast } from 'react-toastify';

import history from '../../../services/history';
import api from '../../../services/api';

import { Container } from '../../../styles/layoutsDefaults';

export default function EditStudent() {
  const enrollment = useSelector(state => state.enrollment.payload);

  const [students, setStudents] = useState([]);
  const [plans, setPlans] = useState([]);
  const [idPlan, setIdPlan] = useState();
  const [idStudent, setIdStudent] = useState();
  const [startDate, setStartDate] = useState();
  const [endDate, setEndDate] = useState('dd/mm/yyyy');
  const [totalPrice, setTotalPrice] = useState();

  useEffect(() => {
    async function getStudents() {
      const response = await api.get(`enrollments/${enrollment.id}`);
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

  async function handleEdit() {
    try {
      await api.put(`enrollments/${enrollment.id}`, {
        student_id: idStudent,
        plan_id: idPlan,
        start_date: new Date(startDate),
      });

      toast.success('Alterado com sucesso');
      history.push('/enrollments');
    } catch (err) {
      toast.error('Falha na alteraçāo, tente novamente');
    }
  }

  function handleBack() {
    history.push('/enrollments');
  }

  return (
    <Container>
      <header>
        <h2>Editando matricula</h2>
        <div>
          <button onClick={handleBack} id="back">
            Voltar
          </button>
        </div>
      </header>
      <Form initialData={enrollment} onSubmit={handleEdit}>
        <div className="big">
          <p>Aluno</p>
          <Select
            name="student.name"
            onChange={e => setIdStudent(e.target.value)}
            options={students}
          />
        </div>
        <div>
          <div>
            <p>plano</p>
            <Select
              name="plan"
              options={plans}
              onChange={e => setIdPlan(e.target.value)}
            />
          </div>
          <div>
            <p>Data de inicio</p>
            <Input
              type="date"
              onChange={e => setStartDate(e.target.value)}
              name="start_date"
            />
          </div>
          <div className="read-only">
            <p>Data de término</p>
            <Input
              type="name"
              value={endDate ? endDate : 0}
              readOnly
              name="finalDate"
            />
          </div>
          <div className="read-only">
            <p>Valor final</p>
            <Input
              type="number"
              readOnly
              value={totalPrice}
              name="totalPrice"
            />
          </div>
        </div>
        <button type="submit">Editar</button>
      </Form>
    </Container>
  );
}
