export function loadEditStudent({ id, name, email, idade, peso, altura }) {
  return {
    type: '@student/LOAD_EDIT',
    payload: {
      id,
      name,
      email,
      idade,
      peso,
      altura,
    },
  };
}
