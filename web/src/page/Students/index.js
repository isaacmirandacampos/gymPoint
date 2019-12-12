import React, { useState, useEffect } from 'react';

import history from '../../services/history';
import api from '../../services/api';
import { Container, ScrollTable } from './styles';
import { toast } from 'react-toastify';

export default function Students() {
  const [students, setStudents] = useState([]);
  const [idDelete, setIdDelete] = useState();

  useEffect(() => {
    async function handleStudent() {
      const response = await api.get('students');
      const { Students } = response.data;
      setStudents(Students);
    }
    handleStudent();
  }, [idDelete]);

  function handleRegisterStudent() {
    history.push('/student-register');
  }

  function handleEdit(id) {
    history.push(`/student-edit/${id}`);
  }

  async function handleDelete(id) {
    try {
      await api.delete(`students/${id}`);
      toast.success('Estudante deletado com sucesso');
      setIdDelete(id);
    } catch (err) {
      toast.error('Nao foi possivel deletar');
    }
  }

  return (
    <Container>
      <header>
        <h2>Gerenciando alunos</h2>
        <div>
          <button onClick={handleRegisterStudent}>Cadastrar</button>
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
            {students.map(student => (
              <tr key={student.id}>
                <td>{student.name}</td>
                <td>{student.email}</td>
                <td>{student.idade}</td>
                <td>
                  <button onClick={() => handleEdit(student.id)}>editar</button>
                  <button onClick={() => handleDelete(student.id)}>
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
