import React, { useState, useEffect } from 'react';

import history from '../../services/history';
import api from '../../services/api';
import { Container, ScrollTable } from './styles';
import { toast } from 'react-toastify';

export default function Enrollments() {
  const [enrollments, setEnrollments] = useState([]);

  useEffect(() => {
    async function handleState() {
      const response = await api.get('/enrollments');
      const { Enrollments } = response.data;
      setEnrollments(Enrollments);
    }
    handleState();
  }, []);

  function handleRegister() {
    history.push('/enrollments-register');
  }

  function handleRender() {
    return enrollments.map(enrollment => (
      <tr key={enrollment.id}>
        <td>{enrollment.student.name}</td>
        <td>{enrollment.plan.title}</td>
        <td>{enrollment.plan.createdAt}</td>
        <td>{enrollment.plan.duration}</td>
        <td>{enrollment.plan.duration}</td>
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
        <h2>Gerenciando matriculas</h2>
        <div>
          <button onClick={handleRegister}>Cadastrar</button>
        </div>
      </header>
      <ScrollTable>
        <table>
          <tbody>
            <tr>
              <th>Aluno</th>
              <th>Plano</th>
              <th>Inicio</th>
              <th>termino</th>
              <th>Ativa</th>
            </tr>
            {handleRender()}
          </tbody>
        </table>
      </ScrollTable>
    </Container>
  );
}
