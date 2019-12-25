import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';

import { toast } from 'react-toastify';
import history from '../../services/history';
import api from '../../services/api';
import { Container, ScrollTable } from './styles';
import { loadEditPlan } from '../../store/modules/plan/actions';

export default function Plans() {
  const [plans, setPlans] = useState([]);
  const [idDelete, setIdDelete] = useState();

  const dispatch = useDispatch();

  useEffect(() => {
    async function handleState() {
      const response = await api.get('plans');
      const { Plans } = response.data;
      setPlans(Plans);
    }
    handleState();
  }, [idDelete]);

  async function handleDelete(id) {
    try {
      await api.delete(`plans/${id}`);
      setIdDelete(id);
      toast.success('Deletedo com sucesso');
    } catch (err) {
      toast.error('Possui estudantes matriculados com plano');
    }
  }

  function handleRegister() {
    history.push('/plans/register');
  }

  function handleEdit(plan) {
    dispatch(loadEditPlan(plan));
  }

  const i = plans.find(p => p.id > 1);
  console.tron.log(i);

  return (
    <Container>
      <header>
        <h2>Gerenciando planos</h2>
        <div>
          <button onClick={handleRegister}>Cadastrar</button>
        </div>
      </header>
      <ScrollTable>
        <table>
          <tbody>
            <tr>
              <th>Titulo</th>
              <th>duração</th>
              <th>Valor p/ mês</th>
            </tr>
            {plans.map(plan => (
              <tr key={plan.id}>
                <td>{plan.title}</td>
                <td>{plan.duration}</td>
                <td>{plan.price}</td>
                <td>
                  <button onClick={() => handleEdit(plan)}>editar</button>
                  <button onClick={() => handleDelete(plan.id)}>apagar</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </ScrollTable>
    </Container>
  );
}
