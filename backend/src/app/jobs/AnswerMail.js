import Mail from '../../lib/Mail';

class AnswerMail {
  get key() {
    return 'AnswerMail';
  }

  async handle({ data }) {
    const { name, email, question, answer } = data;

    await Mail.sendMail({
      to: `${name} <${email}>`,
      subject: 'Tirando Dúvidas',
      template: 'answer',
      context: {
        name,
        question,
        answer,
      },
    });
  }
}
export default new AnswerMail();
