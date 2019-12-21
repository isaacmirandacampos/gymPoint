import { Alert } from 'react-native';
import { all, takeLatest, put, call } from 'redux-saga/effects';

import api from '../../../services/api';

import { signInSuccess, signFailure } from './actions';

export function* signIn({ id }) {
  try {
    const response = yield call(api.get, `students/${id}`);
    const { student } = response.data;

    yield put(signInSuccess(student));
  } catch (err) {
    Alert.alert('Falha na autenticação', [
      'Houve um erro no login, verifique seus dados',
    ]);
    yield put(signFailure());
  }
}

export default all([takeLatest('@auth/SIGN_IN_REQUEST', signIn)]);
