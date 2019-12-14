import produce from 'immer';
import history from '../../../services/history';

const INITIAL_STATE = {
  payload: null,
};

export default function plan(state = INITIAL_STATE, action) {
  return produce(state, draft => {
    switch (action.type) {
      case '@plan/LOAD_EDIT':
        draft.payload = action.payload;
        history.push(`plans/edit/${action.payload.id}`);
        break;
      default:
    }
  });
}
