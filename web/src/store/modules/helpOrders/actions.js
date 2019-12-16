export function responseHelpOrders(id, { name }, question) {
  return {
    type: '@helpOrders/RESPONSE_HELP',
    id,
    name,
    question,
  };
}

export function responseHelpOrdersRequest(answer, id) {
  return { type: '@helpOrders/RESPONSE_HELP_REQUEST', payload: { answer, id } };
}

export function closeModal() {
  return { type: '@helpOrders/CLOSE_MODAL' };
}
