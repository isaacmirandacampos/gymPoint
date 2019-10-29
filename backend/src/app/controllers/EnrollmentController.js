import * as Yup from 'yup';
import { parseISO, startOfHour, isBefore, addMonths, format } from 'date-fns';
import { pt } from 'date-fns/locale';
import Enrollment from '../models/Enrollment';
import Student from '../models/Student';
import Scheme from '../models/Scheme';
import Notification from '../schemas/Notification';

import EnrollmentMail from '../jobs/EnrollmentMail';
import CancellationMail from '../jobs/CancellationMail';
import Queue from '../../lib/Queue';

class EnrollmentController {
  async index(req, res) {
    const { page = 1 } = req.query;
    const enrollment = await Enrollment.findAll({
      attributes: ['id', 'start_date', 'end_date', 'price'],
      include: [
        {
          model: Student,
          as: 'student',
          attributes: ['id', 'name'],
        },
        {
          model: Scheme,
          as: 'plan',
          attributes: ['id', 'title', 'duration'],
        },
      ],

      limit: 20,
      offset: (page - 1) * 20,
    });
    return res.json({ enrollment });
  }

  async store(req, res) {
    const schema = Yup.object().shape({
      student_id: Yup.number()
        .integer()
        .required(),
      plan_id: Yup.number()
        .integer()
        .required(),
      start_date: Yup.date().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json('incomplete fields');
    }
    const student = await Student.findOne({
      where: { id: req.body.student_id },
      attributes: ['id', 'name', 'email'],
    });

    if (!student) {
      return res.status(400).json({ error: 'Student not exist' });
    }

    const plan = await Scheme.findOne({
      where: { id: req.body.plan_id },
      attributes: ['id', 'title', 'duration', 'price'],
    });

    if (!plan) {
      return res.status(400).json({ error: 'plan not exist' });
    }

    const start_date = startOfHour(parseISO(req.body.start_date));

    if (isBefore(start_date, new Date())) {
      return res.status(400).json({ error: 'the date is past' });
    }
    req.body.end_date = addMonths(start_date, plan.duration);

    const { end_date } = req.body;

    if (!end_date) {
      return res.status(400).json({ error: 'failed enrollment' });
    }

    const price = plan.price * plan.duration;

    const enrollmentExist = await Enrollment.findOne({
      where: { student_id: req.body.student_id },
    });

    if (enrollmentExist) {
      return res.status(400).json({ error: 'This Student is registered' });
    }

    const enrollment = await Enrollment.create({
      student_id: student.id,
      plan_id: plan.id,
      start_date,
      end_date,
      price,
    });
    const formattedDate = format(start_date, "dd 'de' MMMM yyyy", {
      locale: pt,
    });
    await Notification.create({
      content: `Parabéns ${student.name}!! Você teve sua matricula efetivada no nosso plano: ${plan.title} que tem ${plan.duration} meses de duração. Suas aulas começam no dia ${formattedDate}.`,
    });
    await Queue.add(EnrollmentMail.key, {
      student,
      plan,
      formattedDate,
    });

    return res.json({ enrollment });
  }

  async update(req, res) {
    const schema = Yup.object().shape({
      student_id: Yup.number(),
      plan_id: Yup.number(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'filds invalid' });
    }

    const enrollment = await Enrollment.findOne({
      where: { id: req.params.enrollmentId },
      attributes: ['id', 'start_date'],
      include: [
        { model: Student, as: 'student', attributes: ['id', 'name', 'email'] },
      ],
    });

    if (!enrollment) {
      return res
        .status(400)
        .json({ error: 'Enrollment not exist for alteration' });
    }

    const { price, duration } = await Scheme.findOne({
      where: { id: req.body.plan_id },
    });

    req.body.price = price * duration;

    req.body.end_date = addMonths(enrollment.start_date, duration);

    await enrollment.update(req.body);

    return res.json({ enrollment });
  }

  async delete(req, res) {
    const enrollment = await Enrollment.findOne({
      where: { id: req.params.enrollmentId },
      attributes: ['id', 'start_date', 'end_date', 'price'],
      include: [
        { model: Student, as: 'student', attributes: ['id', 'name', 'email'] },
        { model: Scheme, as: 'plan', attributes: ['id', 'title'] },
      ],
    });

    if (!enrollment) {
      return res.status(400).json({ error: 'Enrollment not exist' });
    }

    await enrollment.destroy();

    await Notification.create({
      content: `Caro ${enrollment.student.name} esse e-mail é para confirmar que sua matricula foi cancelada como solicitada, caso deseje voltar com a parceria, é só você responder este mesmo e-mail`,
    });

    await Queue.add(CancellationMail.key, {
      enrollment,
    });

    return res.json({ enrollment });
  }
}

export default new EnrollmentController();
