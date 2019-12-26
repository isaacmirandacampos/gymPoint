import { Alert } from 'react-native';
import { all, takeLatest, put, call } from 'redux-saga/effects';

import api from '../../../services/api';

import { signInSuccess, signFailure } from './actions';

export function* signIn({ id }) {
  try {
    const response = yield call(api.get, `students/${id}`);
    const { student } = response.data;
    if (!student) {
      return Alert.alert(
        'Falha na autênticação',
        'ID inserido não é de um estudante válido'
      );
    }
    yield put(signInSuccess(student));
  } catch (err) {
    Alert.alert(
      'Falha na autenticação',
      'Houve um erro no login, verifique seus dados'
    );
    return yield put(signFailure());
  }
}

export default all([takeLatest('@auth/SIGN_IN_REQUEST', signIn)]);
