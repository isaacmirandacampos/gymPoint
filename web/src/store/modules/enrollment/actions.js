export function loadEditEnrollment(enrollment) {
  return {
    type: '@enrollment/LOAD_EDIT',
    payload: enrollment,
  };
}
