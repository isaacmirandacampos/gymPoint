import Mail from '../../lib/Mail';

class HelpOrdersMail {
  get key() {
    return 'HelpOrdersMail';
  }

  async handle({ data }) {
    const { helpOrders, ask, answer } = data;
    await Mail.sendMail({
      to: `${helpOrders.name} <${helpOrders.email}>`,
      subject: 'Tirando Dúvidas',
      template: 'answer',
      context: {
        helpOrders: helpOrders.name,
        question: ask,
        answer,
      },
    });
  }
}
export default new HelpOrdersMail();
