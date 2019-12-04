import Mail from '../../lib/Mail';

class CancellationMail {
  get key() {
    return 'CancellationMail';
  }

  async handle({ data }) {
    const { enrollment } = data;

    await Mail.sendMail({
      to: `${enrollment.student.name} <${enrollment.student.email}>`,
      subject: 'Cancelamento de matricula',
      template: 'cancellation',
      context: {
        student: enrollment.student.name,
      },
    });
  }
}
export default new CancellationMail();
