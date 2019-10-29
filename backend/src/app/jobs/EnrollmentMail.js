import Mail from '../../lib/Mail';

class EnrollmentMail {
  get key() {
    return 'EnrollmentMail';
  }

  async handle({ data }) {
    const { student, plan, formattedDate } = data;

    await Mail.sendMail({
      to: `${student.name} <${student.email}>`,
      subject: 'Matricula efetuada',
      template: 'enrollment',
      context: {
        student: student.name,
        plan: plan.title,
        date: formattedDate,
      },
    });
  }
}
export default new EnrollmentMail();
