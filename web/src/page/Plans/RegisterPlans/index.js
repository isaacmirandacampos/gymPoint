import React, { useState, useEffect } from 'react';
import { Form, Input } from '@rocketseat/unform';

import * as Yup from 'yup';
import { toast } from 'react-toastify';

import history from '../../../services/history';
import api from '../../../services/api';

import { Container } from '../../../styles/layoutsDefaults';
import formatterPrice from '../../../util/formatter';

const schema = Yup.object().shape({
  title: Yup.string().required('Nome obrigatorio'),
  duration: Yup.number('Duracao em meses').required('duracao e obrigatorio'),
  price: Yup.number('Digite o valor por mes').required('Preco obrigatorio'),
});

export default function RegisterPlans() {
  const [duration, setDuration] = useState();
  const [price, setPrice] = useState();
  const [totalPrice, setTotalPrice] = useState('R$');

  useEffect(() => {
    if (duration > 0 && price > 0) {
      setTotalPrice(formatterPrice(duration * price));
    } else {
      setTotalPrice('R$');
    }
  }, [duration, price]);

  async function handleRegister({ title, duration, price }) {
    try {
      await api.post('plans', { title, duration, price });
      toast.success('Plano cadastrado com sucesso');
      history.push('/plans');
    } catch (err) {
      toast.error('Falha no cadastramento do plano, tente novamente');
    }
  }

  function handleBack() {
    history.push('/plans');
  }

  return (
    <Container>
      <header>
        <h2>Gerenciando de planos</h2>
        <div>
          <button onClick={handleBack} id="back">
            Voltar
          </button>
        </div>
      </header>
      <Form schema={schema} onSubmit={handleRegister}>
        <div className="big">
          <p>Nome do plano</p>
          <Input type="name" autoFocus name="title" required />
        </div>
        <div>
          <div>
            <p>Duraçāo do plano <small>(em meses)</small></p>
            <Input
              type="number"
              required
              name="duration"
              min={0}
              onChange={e => setDuration(e.target.value)}
              value={duration}
            />
          </div>
          <div>
            <p>Preco plano <small>(R$)</small></p>
            <Input
              type="number"
              step=".01"
              min={0}
              defaultValue={0}
              required
              name="price"
              value={price}
              onChange={e => setPrice(e.target.value)}
            />
          </div>

          <div className="read-only">
            <p>Preço total</p>
            <Input
              type="text"
              required
              readOnly
              name="priceTotal"
              value={totalPrice || 'R$'}
            />
          </div>
        </div>
        <button type="submit">Cadastrar</button>
      </Form>
    </Container>
  );
}
