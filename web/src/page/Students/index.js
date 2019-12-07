import React from 'react';

import { Container, ScrollTable } from './styles';
export default function Students() {
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
