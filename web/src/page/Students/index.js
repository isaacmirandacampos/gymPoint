import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';

import history from '../../services/history';
import api from '../../services/api';
import { Container, Search, ScrollTable } from './styles';
import { loadEditStudent } from '../../store/modules/student/actions';

export default function Students() {
  const [students, setStudents] = useState([]);
  const [searchStudent, setSearchStudent] = useState();
  const [idDelete, setIdDelete] = useState();
  const dispatch = useDispatch();

  useEffect(() => {
    async function handleStudent() {
      const response = await api.get('students');
      const students = response.data.students.map(student => ({
        search: true,
        notDelete: true,
        ...student,
      }));
      setStudents(students);
    }
    handleStudent();
  }, []);

  useEffect(() => {
    const array = students.map(student => {
      if (idDelete === student.id) {
        student.notDelete = false;
      }
      return student;
    });
    setStudents(array);
  }, [idDelete]);

  useEffect(() => {
    const array = students.map(student => {
      const validation = student.name
        .toUpperCase()
        .includes(searchStudent.toUpperCase());
      if (!validation) {
        student.search = false;
      } else {
        student.search = true;
      }
      return student;
    });
    setStudents(array);
  }, [searchStudent]);

  function handleRegisterStudent() {
    history.push('/students/register');
  }

  function handleEdit(student) {
    dispatch(loadEditStudent(student));
  }

  async function handleDelete(id) {
    try {
      await api.delete(`students/${id}`);
      toast.success('Estudante deletado com sucesso');
      setIdDelete(id);
    } catch (err) {
      toast.error('Estudante possui uma matricula');
    }
  }

  return (
    <Container>
      <header>
        <h2>Gerenciando alunos</h2>
        <div>
          <button onClick={handleRegisterStudent}>Cadastrar</button>
          <Search />
          <input
            onChange={e => setSearchStudent(e.target.value)}
            results={10}
            type="search"
            pattern="[A-z]{2}"
            placeholder="Buscar Aluno"
            name="buscar"
          />
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
            {students.map(
              student =>
                student.search &&
                student.notDelete && (
                  <tr key={student.id}>
                    <td>{student.name}</td>
                    <td>{student.email}</td>
                    <td>{student.idade}</td>
                    <td>
                      <button onClick={() => handleEdit(student)}>
                        editar
                      </button>
                      <button onClick={() => handleDelete(student.id)}>
                        apagar
                      </button>
                    </td>
                  </tr>
                )
            )}
          </tbody>
        </table>
      </ScrollTable>
    </Container>
  );
}
