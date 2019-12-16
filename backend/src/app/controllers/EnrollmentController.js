import * as Yup from 'yup';
import { isBefore, addMonths, format } from 'date-fns';
import { pt } from 'date-fns/locale';
import Enrollment from '../models/Enrollment';
import Student from '../models/Student';
import Plan from '../models/Plan';
import Notification from '../schemas/Notification';

import EnrollmentMail from '../jobs/EnrollmentMail';
import CancellationMail from '../jobs/CancellationMail';
import Queue from '../../lib/Queue';

class EnrollmentController {
  async index(req, res) {
    if (req.params.enrollmentId) {
      const Enrollments = await Enrollment.findAll({
        attributes: ['id', 'start_date', 'end_date', 'price'],
        include: [
          {
            model: Student,
            as: 'student',
            attributes: ['id', 'name'],
          },
          {
            model: Plan,
            as: 'plan',
            attributes: ['id', 'title', 'price', 'duration', 'createdAt'],
          },
        ],
      });
      const Students = await Student.findAll({ attributes: ['id', 'name'] });

      const array = [];
      let i;
      for (i = 0; i < Students.length; i++) {
        if (!Enrollments.find(e => e.student.id === Students[i].id)) {
          array[i] = Students[i];
        }
      }
      function isNull(value) {
        return value !== null;
      }
      const students = array.filter(isNull);

      return res.json({ students });
    }
    const { page = 1 } = req.query;
    const Enrollments = await Enrollment.findAll({
      attributes: ['id', 'start_date', 'end_date', 'price'],
      include: [
        {
          model: Student,
          as: 'student',
          attributes: ['id', 'name'],
        },
        {
          model: Plan,
          as: 'plan',
          attributes: ['id', 'title', 'price', 'duration', 'createdAt'],
        },
      ],

      limit: 20,
      offset: (page - 1) * 20,
    });
    return res.json({ Enrollments });
  }

  async store(req, res) {
    const schema = Yup.object().shape({
      student_id: Yup.number().required(),
      plan_id: Yup.number().required(),
      start_date: Yup.date().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'incomplete fields' });
    }
    const { student_id } = req.body;
    const student = await Student.findOne({
      where: { id: student_id },
      attributes: ['id', 'name', 'email'],
    });

    if (!student) {
      return res.status(400).json({ error: 'Student not exist' });
    }

    const { plan_id } = req.body;

    const plan = await Plan.findOne({
      where: { id: plan_id },
      attributes: ['id', 'title', 'duration', 'price'],
    });

    if (!plan) {
      return res.status(400).json({ error: 'plan not exist' });
    }

    const { start_date } = req.body;

    if (isBefore(start_date, new Date())) {
      return res.status(400).json({ error: 'the date is past' });
    }

    req.body.end_date = addMonths(new Date(start_date), plan.duration);
    const price = plan.price * plan.duration;

    const enrollmentExist = await Enrollment.findOne({
      where: { student_id: student.id },
    });

    if (enrollmentExist) {
      return res.status(400).json({ error: 'This Student is registered' });
    }
    const { end_date } = req.body;

    const formattedDate = format(new Date(start_date), "dd 'de' MMMM yyyy", {
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

    const enrollment = await Enrollment.create({
      student_id: student.id,
      plan_id: plan.id,
      start_date,
      end_date,
      price,
    });

    return res.json({ enrollment });
  }

  async update(req, res) {
    const schema = Yup.object().shape({
      student_id: Yup.number(),
      plan_id: Yup.number(),
      start_date: Yup.date(),
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

    const plan = await Plan.findOne({
      where: { id: req.body.plan_id },
    });

    if (!plan) {
      return res.status(401).json({ error: 'Plan not exist' });
    }
    const { price, duration } = plan;

    req.body.price = price * duration;

    const { start_date } = req.body;

    req.body.end_date = addMonths(new Date(start_date), duration);
    await enrollment.update(req.body);

    return res.json({ ok: 'Update Success' });
  }

  async delete(req, res) {
    const enrollment = await Enrollment.findOne({
      where: { id: req.params.enrollmentId },
      attributes: ['id', 'start_date', 'end_date', 'price'],
      include: [
        { model: Student, as: 'student', attributes: ['id', 'name', 'email'] },
        { model: Plan, as: 'plan', attributes: ['id', 'title'] },
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
