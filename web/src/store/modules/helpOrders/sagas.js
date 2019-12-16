import { all, takeLatest, call, put } from 'redux-saga/effects';
import { useSelector, useStore } from 'react-redux';
import api from '../../../services/api';
import { toast } from 'react-toastify';
import { closeModal } from './actions';

export function* responseHelpOrders({ payload }) {
  try {
    console.tron.log(payload);

    const { id, answer } = payload;
    yield call(api.put, `/students/help-orders/${id}/answer`, { answer });
    toast.success('Resposta enviada');
    yield put(closeModal());
  } catch (err) {
    toast.error('Falha no envio da respostas, tente novamente');
  }
}

export default all([
  takeLatest('@helpOrders/RESPONSE_HELP_REQUEST', responseHelpOrders),
]);
