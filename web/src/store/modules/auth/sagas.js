import { all, takeLatest, put, call } from 'redux-saga/effects';

import { toast } from 'react-toastify';
import history from '../../../services/history';
import api from '../../../services/api';
import { signInSuccess } from './actions';

export function* signIn({ payload }) {
  try {
    const { email, password } = payload;

    const response = yield call(api.post, 'sessions', {
      email,
      password,
    });

    const { token, user } = response.data;

    yield put(signInSuccess(token, user));

    history.push('/dashboard');
  } catch (e) {
    toast.error('Revise seu e-mail e senha');
  }
}

export function* signUp({ payload }) {
  try {
    const { name, email, password } = payload;

    yield call(api.post, 'register', { name, email, password });
    toast.success('Usuario cadastrado');
    history.push('/');
  } catch (e) {
    toast.error('E-mail ja cadastrado');
  }
}

export default all([
  takeLatest('@auth/SIGN_IN_REQUEST', signIn),
  takeLatest('@auth/SIGN_UP_REQUEST', signUp),
]);
