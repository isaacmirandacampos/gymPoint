import React from 'react';
export default function Students() {
  return (
    <div>
      <header>
        <h2>Gerenciando alunos</h2>
        <aside>
          <button>Cadastrar</button>
          <input type="search" placeholder="Buscar Aluno" name="buscar" />
        </aside>
      </header>
      <table>
        <thead>
          <h3>nome</h3>
          <h3>e-mail</h3>
          <h3>idade</h3>
        </thead>
        <tbody></tbody>
      </table>
    </div>
  );
}
