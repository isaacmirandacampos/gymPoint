import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Form, Textarea } from '@rocketseat/unform';

import { Modal, Button } from 'react-bootstrap';
import {
  closeModal,
  responseHelpOrdersRequest,
} from '../../../store/modules/helpOrders/actions';

import { Response } from './styles';

export default function Answer() {
  const show = useSelector(state => state.helpOrders.show);
  const id = useSelector(state => state.helpOrders.id);
  const name = useSelector(state => state.helpOrders.name);
  const question = useSelector(state => state.helpOrders.question);
  const dispatch = useDispatch();

  function handleClose() {
    dispatch(closeModal());
  }

  function handleAnswer({ answer }) {
    dispatch(responseHelpOrdersRequest(answer, id));
  }

  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>{name}</Modal.Title>
      </Modal.Header>
      <Form onSubmit={handleAnswer}>
        <Modal.Body>
          <Response>
            <p>{question}</p>
            <Textarea maxLength={240} name="answer" />
          </Response>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="danger" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleAnswer} type="submit">
            Responder aluno
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
}
