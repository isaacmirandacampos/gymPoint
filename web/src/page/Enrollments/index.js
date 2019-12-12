import React, { useState, useEffect } from 'react';
import { parseISO, format, isBefore } from 'date-fns';
import pt from 'date-fns/locale/pt';
import { MdCheckCircle } from 'react-icons/md';

import history from '../../services/history';
import api from '../../services/api';
import { Container, ScrollTable } from './styles';
import { toast } from 'react-toastify';

export default function Enrollments() {
  const [enrollments, setEnrollments] = useState([]);
  const [idDelete, setIdDelete] = useState();

  useEffect(() => {
    async function handleState() {
      const response = await api.get('enrollments');
      const { Enrollments } = response.data;

      const enrollmentDateFormatted = Enrollments.map(enrollment => {
        enrollment.formattedInitDate = format(
          parseISO(enrollment.start_date),
          "dd 'de' MMMM 'de' yyyy",
          { locale: pt }
        );
        enrollment.formattedFinalDate = format(
          parseISO(enrollment.end_date),
          "dd 'de' MMMM 'de' yyyy",
          { locale: pt }
        );
        return enrollment;
      });

      setEnrollments(enrollmentDateFormatted);
    }
    handleState();
  }, [idDelete]);

  function handleRegister() {
    history.push('/enrollments-register');
  }

  async function handleDelete(id) {
    try {
      await api.delete(`enrollments/${id}`);
      setIdDelete(id);
      toast.success('Deletado com sucesso');
    } catch (err) {
      toast.error('Falha ao tentar deletar');
    }
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
            {enrollments.map(enrollment => (
              <tr>
                <td>{enrollment.student.name}</td>
                <td>{enrollment.plan.title}</td>
                <td>{enrollment.formattedInitDate}</td>
                <td>{enrollment.formattedFinalDate}</td>
                <td>
                  {isBefore(enrollment.formattedFinalDate, new Date()) ? (
                    <MdCheckCircle />
                  ) : (
                    <MdCheckCircle color="green" />
                  )}
                </td>
                <td>
                  <button>editar</button>
                  <button onClick={() => handleDelete(enrollment.id)}>
                    apagar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </ScrollTable>
    </Container>
  );
}
