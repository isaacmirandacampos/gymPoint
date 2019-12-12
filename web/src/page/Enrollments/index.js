import React, { useState, useEffect } from 'react';
import { parseISO, format, addMonths, isBefore } from 'date-fns';
import { MdCheckCircle } from 'react-icons/md';

import history from '../../services/history';
import api from '../../services/api';
import { Container, ScrollTable } from './styles';

export default function Enrollments() {
  const [enrollments, setEnrollments] = useState([]);

  useEffect(() => {
    async function handleState() {
      const response = await api.get('enrollments');
      const { Enrollments } = response.data;

      const enrollmentDateFormatted = Enrollments.map(enrollment => {
        enrollment.plan.formatedDate = format(
          parseISO(enrollment.plan.createdAt),
          "dd 'de' MMMM 'de' yyyy"
        );

        return enrollment;
      });

      const enrollmenstFinalDate = enrollmentDateFormatted.map(enrollment => {
        enrollment.plan.finalDate = format(
          addMonths(
            parseISO(enrollment.plan.createdAt),
            enrollment.plan.duration
          ),
          "dd 'de' MMMM 'de' yyyy"
        );
        return enrollment;
      });

      setEnrollments(enrollmenstFinalDate);
      console.tron.log(enrollmenstFinalDate);
    }
    handleState();
  }, []);

  function handleRegister() {
    history.push('/enrollments-register');
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
                <td>{enrollment.plan.formatedDate}</td>
                <td>{enrollment.plan.finalDate}</td>
                <td>
                  {isBefore(enrollment.plan.finalDate, new Date()) ? (
                    <MdCheckCircle />
                  ) : (
                    <MdCheckCircle color="green" />
                  )}
                </td>
                <td>
                  <button>editar</button>
                  <button>apagar</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </ScrollTable>
    </Container>
  );
}
