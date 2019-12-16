import produce from 'immer';

const INITIAL_STATE = {
  id: null,
  name: null,
  question: null,
  show: false,
};

export default function helpOrders(state = INITIAL_STATE, action) {
  return produce(state, draft => {
    switch (action.type) {
      case '@helpOrders/RESPONSE_HELP':
        draft.id = action.id;
        draft.name = action.name;
        draft.question = action.question;
        draft.show = true;
        break;
      case '@helpOrders/CLOSE_MODAL':
        draft.id = null;
        draft.name = null;
        draft.question = null;
        draft.show = false;
        break;
      default:
    }
  });
}
