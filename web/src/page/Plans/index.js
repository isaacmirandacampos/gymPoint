import React, { useState, useEffect } from 'react';

import history from '../../services/history';
import api from '../../services/api';
import { Container, ScrollTable } from './styles';
import { toast } from 'react-toastify';

export default function Plans() {
  const [plans, setPlans] = useState([]);

  useEffect(() => {
    async function handleState() {
      const response = await api.get('/plans');
      const { Plans } = response.data;
      setPlans(Plans);
    }
    handleState();
  }, []);

  function handleRegister() {
    history.push('/plans-register');
  }

  function handleRender() {
    return plans.map(plan => (
      <tr>
        <td>{plan.title}</td>
        <td>{plan.duration}</td>
        <td>{plan.price}</td>
        <td>
          <button>editar</button>
          <button>apagar</button>
        </td>
      </tr>
    ));
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
            {handleRender()}
          </tbody>
        </table>
      </ScrollTable>
    </Container>
  );
}
