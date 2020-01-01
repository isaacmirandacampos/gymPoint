import React from 'react';
import { useSelector } from 'react-redux';
import { Form, Input } from '@rocketseat/unform';

import * as Yup from 'yup';
import { toast } from 'react-toastify';

import history from '../../../services/history';
import api from '../../../services/api';
import formatterPrice from '../../../util/formatter';

import { Container } from '../../../styles/layoutsDefaults';

const schema = Yup.object().shape({
  title: Yup.string(),
  duration: Yup.number('Digite um numero'),
  price: Yup.number('Digite um numero'),
});

export default function EditStudent() {
  const plan = useSelector(state => state.plan.payload);

  async function handleEdit({ title, duration, price }) {
    try {
      await api.put(`plans/${plan.id}`, { title, duration, price });
      toast.success('Alterado com sucesso');
      history.push('/plans');
    } catch (err) {
      toast.error('Falha na alteraçāo, tente novamente');
    }
  }
  function handleBack() {
    history.push('/plans');
  }
  return (
    <Container>
      <header>
        <h2>Editando alunos</h2>
        <div>
          <button id="back" onClick={handleBack}>
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
            <p>duraçāo <small>(em meses)</small></p>
            <Input type="number" name="duration" />
          </div>
          <div>
            <p>Preço mensal <small>(R$)</small></p>
            <Input type="number" step=".01" name="price" />
          </div>
          <div className="read-only">
            <p>preço total <small>(R$)</small></p>
            <Input
              type="text"
              value={formatterPrice(plan.price * plan.duration)}
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
