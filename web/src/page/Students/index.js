import React, { useState, useEffect } from 'react';

import history from '../../services/history';
import api from '../../services/api';
import { Container, ScrollTable } from './styles';
import { toast } from 'react-toastify';

export default function Students() {
  const [students, setStudents] = useState([]);

  useEffect(() => {
    async function handleStudent() {
      const response = await api.get('students');
      const { Students } = response.data;
      setStudents(Students);
    }
    handleStudent();
  }, []);

  function handleRegisterStudent() {
    history.push('/student-register');
  }

  function handleEdit() {
    history.push('/student-edit');
  }

  async function handleDelete(id) {
    try {
      const indexStudent = students.findIndex(student => student.id === id);
      const listStudents = students;

      listStudents.splice(indexStudent, 1);

      const response = await api.delete(`students?id=${id}`);

      const { name } = response.data;

      toast.success(`Estudante ${name} deletado`);
      setStudents(listStudents);
    } catch (err) {
      toast.error('Nao foi possivel deletar');
    }
  }

  function handleRender() {
    return students.map(student => (
      <tr key={student.id}>
        <td>{student.name}</td>
        <td>{student.email}</td>
        <td>{student.idade}</td>
        <td>
          <button onClick={handleEdit}>editar</button>
          <button onClick={() => handleDelete(student.id)}>apagar</button>
        </td>
      </tr>
    ));
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
            {handleRender()}
          </tbody>
        </table>
      </ScrollTable>
    </Container>
  );
}
