import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button } from 'react-bootstrap';

import Modal from './Answer';

import api from '../../services/api';
import { responseHelpOrders } from '../../store/modules/helpOrders/actions';
import { Container, ScrollTable, Response } from './styles';

export default function HelpOrders() {
  const [helpOrders, setHelpOrders] = useState([]);
  const dispatch = useDispatch();
  const answerHelp = useSelector(state => state.helpOrders);

  useEffect(() => {
    async function handleHelpOrders() {
      const response = await api.get('students/help-orders/all');
      setHelpOrders(response.data.helpOrders);
    }
    handleHelpOrders();
  }, []);

  function clearNull(value) {
    return value !== null;
  }

  useEffect(() => {
    let tempHelp = helpOrders;
    for (let i = 0; i < helpOrders.length; i++) {
      if (tempHelp[i].id === answerHelp.id) {
        tempHelp[i] = null;
      }
    }
    const finalHelp = tempHelp.filter(clearNull);
    setHelpOrders(finalHelp);
  }, [answerHelp.answer]);

  function handleShow({ id, students, question }) {
    dispatch(responseHelpOrders(id, students, question));
  }
  return (
    <Container>
      <header>
        <h2>Gerenciando planos</h2>
      </header>
      <ScrollTable>
        <table>
          <tbody>
            <tr>
              <th>Aluno</th>
            </tr>
            {helpOrders.map(help => (
              <tr key={help.id}>
                <td>{help.students.name}</td>
                <td>
                  <Button onClick={() => handleShow(help)}>responder</Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </ScrollTable>
      <Response>
        <Modal />
      </Response>
    </Container>
  );
}
