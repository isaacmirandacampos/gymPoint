import { call, all, takeLatest } from 'redux-saga/effects';
import history from '../../../services/history';

export function signOut() {
  history.push('/');
}

export default all([takeLatest('@auth/SIGN_OUT', signOut)]);
