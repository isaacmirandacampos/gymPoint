import Mail from '../../lib/Mail';
import { format } from 'date-fns';
import { pt } from 'date-fns/locale';

class EnrollmentMail {
  get key() {
    return 'EnrollmentMail';
  }

  async handle({ data }) {
    const { student, plan, start_date, end_date } = data;

    const formattedStartDate = format(
      new Date(start_date),
      "dd 'de' MMMM yyyy",
      {
        locale: pt,
      }
    );

    const formattedEndDate = format(new Date(end_date), "dd 'de' MMMM yyyy", {
      locale: pt,
    });

    await Mail.sendMail({
      to: `${student.name} <${student.email}>`,
      subject: 'Matricula efetuada',
      template: 'enrollment',
      context: {
        student: student.name,
        plan: plan.title,
        start_date: formattedStartDate,
        end_date: formattedEndDate,
        price: plan.price * plan.duration,
      },
    });
  }
}
export default new EnrollmentMail();
