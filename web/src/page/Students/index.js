import React, { useState, useEffect } from 'react';

import api from '../../services/api';
import { Container, ScrollTable } from './styles';

export default function Students() {
  const [students, setStudents] = useState({});

  useEffect(() => {
    async function handleStudent() {
      const students = await api.get('students');
      setStudents(students);
    }
    handleStudent();
  }, []);
  return (
    <Container>
      <header>
        <h2>Gerenciando alunos</h2>
        <div>
          <button>Cadastrar</button>
          <input type="search" placeholder="Buscar Aluno" name="buscar" />
        </div>
      </header>
      <ScrollTable>
        <table>
          <tbody>
            <tr>
              <th>nome</th>
              <th>e-mail</th>
              <th>idade</th>
            </tr>
            <tr>
              <td>Robert Braganca</td>
              <td>robert.s.braganca@gmail.com</td>
              <td>19</td>
              <td>
                <button>editar</button>
                <button>apagar</button>
              </td>
            </tr>
          </tbody>
        </table>
      </ScrollTable>
    </Container>
  );
}
