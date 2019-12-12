import React, { useState, useEffect } from 'react';

import history from '../../services/history';
import api from '../../services/api';
import { Container, ScrollTable } from './styles';
import { toast } from 'react-toastify';

export default function Plans() {
  const [plans, setPlans] = useState([]);
  const [idDelete, setIdDelete] = useState();

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
      toast.error('Algo deu errado, tente novamente');
    }
  }

  function handleRegister() {
    history.push('/plans-register');
  }

  function handleEdit(id) {
    history.push(`plans-edit/${id}`);
  }

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
                  <button onClick={() => handleEdit(plan.id)}>editar</button>
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
