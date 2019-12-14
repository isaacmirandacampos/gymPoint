import React from 'react';
import { useSelector } from 'react-redux';
import { Form, Input } from '@rocketseat/unform';

import * as Yup from 'yup';
import { toast } from 'react-toastify';

import history from '../../../services/history';
import api from '../../../services/api';

import { Container } from '../../../styles/layoutsDefaults';

const schema = Yup.object().shape({
  name: Yup.string().required('nome obrigatorio'),
  email: Yup.string()
    .email('Deve ser um e-mail valido')
    .required('e-mail obrigatorio'),
  idade: Yup.number('Digite um numero').required('idade obrigatoria'),
  peso: Yup.number('Digite um numero').required('peso obrigatorio'),
  altura: Yup.number('Digite um numero').required('altura obrigatoria'),
});

export default function EditStudent() {
  const student = useSelector(state => state.student.payload);

  async function handleEdit({ name, email, idade, peso, altura }) {
    try {
      await api.put(`students/${student.id}`, {
        name,
        email,
        idade,
        peso,
        altura,
      });
      toast.success('Alterado com sucesso');
      history.push('/students');
    } catch (err) {
      toast.error('Falha na alteracao, tente novamente');
    }
  }

  function handleBack() {
    history.push('/students');
  }

  return (
    <Container>
      <header>
        <h2>Editando aluno</h2>
        <div>
          <button onClick={handleBack} id="back">
            Voltar
          </button>
        </div>
      </header>
      <Form schema={schema} initialData={student} onSubmit={handleEdit}>
        <div className="big">
          <p>Nome do aluno</p>
          <Input type="name" autoFocus name="name" />
        </div>
        <div className="big">
          <p>E-mail do aluno</p>
          <Input type="email" name="email" />
        </div>
        <div>
          <div>
            <p>idade</p>
            <Input type="number" step=".01" name="idade" />
          </div>
          <div>
            <p>peso</p>
            <Input type="number" step=".01" name="peso" />
          </div>
          <div>
            <p>Altura</p>
            <Input type="number" step=".01" name="altura" />
          </div>
        </div>
        <button type="submit">Editar</button>
      </Form>
    </Container>
  );
}
