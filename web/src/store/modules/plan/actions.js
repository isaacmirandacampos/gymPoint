export function loadEditPlan({ id, title, duration, price }) {
  return {
    type: '@plan/LOAD_EDIT',
    payload: {
      id,
      title,
      duration,
      price,
    },
  };
}
