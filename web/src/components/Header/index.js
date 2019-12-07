import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { Container } from './styles';

import { signOut } from '../../store/modules/auth/actions';
import logo from '../../assets/logo-header.svg';

export default function Header() {
  const dispatch = useDispatch();
  const { name } = useSelector(state => state.user.user);

  function handleSignOut() {
    dispatch(signOut());
  }
  return (
    <Container>
      <div>
        <img src={logo} alt="gobarber" />
        <nav>
          <NavLink to="/students" activeStyle={{ opacity: 1 }}>
            Alunos
          </NavLink>
          <NavLink to="/plans" activeStyle={{ opacity: 1 }}>
            Planos
          </NavLink>
          <NavLink to="/enrollments" activeStyle={{ opacity: 1 }}>
            Matriculas
          </NavLink>
          <NavLink to="/help-orders" activeStyle={{ opacity: 1 }}>
            Pedidos de auxilio
          </NavLink>
        </nav>
      </div>
      <aside>
        <p>{name}</p>
        <button onClick={handleSignOut}>Sair do sistema</button>
      </aside>
    </Container>
  );
}
