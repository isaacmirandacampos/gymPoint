import React, { useState, useEffect } from 'react';
import { Form, Input } from '@rocketseat/unform';
import { useParams } from 'react-router-dom';

import * as Yup from 'yup';
import { toast } from 'react-toastify';

import history from '../../../services/history';
import api from '../../../services/api';

import { Container } from '../../../styles/layoutsDefaults';

const schema = Yup.object().shape({
  title: Yup.string(),
  duration: Yup.number('Digite um numero'),
  price: Yup.number('Digite um numero'),
});

export default function EditStudent() {
  const { id } = useParams();

  const [plan, setPlan] = useState({});
  const [duration, setDuration] = useState(0);
  const [price, setPrice] = useState(0);
  const [totalPrice, setTotalPrice] = useState();

  useEffect(() => {
    setTotalPrice(duration * price);
  }, [duration, price]);

  useEffect(() => {
    async function getPlan() {
      const response = await api.get(`plans/${id}`);
      const { plan } = response.data;
      setPlan(plan);
      setDuration(plan.duration);
      setPrice(plan.price);
    }
    getPlan();
  }, []);

  async function handleEdit({ title, duration, price }) {
    try {
      await api.put(`plans/${id}`, { title, duration, price });
      toast.success('Alterado com sucesso');
      history.push('/plans');
    } catch (err) {
      toast.error('Falha na alteraçāo, tente novamente');
    }
  }

  function handleBack() {
    history.push('/plans');
  }
  console.tron.log(id);
  return (
    <Container>
      <header>
        <h2>Editando alunos</h2>
        <div>
          <button onClick={handleBack} id="back">
            Voltar
          </button>
        </div>
      </header>
      <Form schema={schema} initialData={plan} onSubmit={handleEdit}>
        <div className="big">
          <p>Titulo do plano</p>
          <Input type="name" autoFocus name="title" />
        </div>
        <div>
          <div>
            <p>duraçāo</p>
            <Input
              type="number"
              name="duration"
              onChange={e => setDuration(e.target.value)}
              value={duration}
            />
          </div>
          <div>
            <p>Preço mensal</p>
            <Input
              type="number"
              onChange={e => setPrice(e.target.value)}
              value={price}
              step=".01"
              name="price"
            />
          </div>
          <div className="read-only">
            <p>preço total</p>
            <Input
              type="number"
              placeholder={plan.price * plan.duration}
              value={totalPrice === 0 ? null : totalPrice}
              readOnly
              name="totalPrice"
            />
          </div>
        </div>
        <button type="submit">Editar</button>
      </Form>
    </Container>
  );
}
