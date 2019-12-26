import * as Yup from 'yup';
import Student from '../models/Student';
import HelpOrders from '../models/HelpOrders';

import AnswerMail from '../jobs/AnswerMail';
import Queue from '../../lib/Queue';

class HelpOrdersController {
  async index(req, res) {
    const student_id = req.params.studentId;
    if (student_id) {
      const helpOrders = await HelpOrders.findAll({
        where: { student_id },
      });
      return res.json({ helpOrders });
    } else {
      const helpOrders = await HelpOrders.findAll({
        where: { answer: null },
        include: [{ model: Student, as: 'students', attributes: ['name'] }],
      });
      return res.json({ helpOrders });
    }
  }

  async store(req, res) {
    const schemaStudent = Yup.object().shape({
      student_id: Yup.number()
        .integer()
        .required(),
    });
    if (!(await schemaStudent.isValid(req.params))) {
      return res.status(400).json({ error: 'Requisition invalid' });
    }

    const schemaQuestion = Yup.object().shape({
      question: Yup.string().required(),
    });
    if (!(await schemaQuestion.isValid(req.body))) {
      return res.status(400).json({ error: 'Requisition invalid' });
    }

    const { student_id } = req.params;

    const student = await Student.findOne({
      where: { id: student_id },
      attributes: ['name', 'email'],
    });

    if (!student) {
      return res.status(400).json({ error: 'Invalid ID' });
    }

    req.body.student_id = student_id;

    const question = await HelpOrders.create(req.body);
    return res.json({ question });
  }

  async update(req, res) {
    const idAnswer = Yup.object().shape({
      id_answer: Yup.number()
        .integer()
        .required(),
    });

    if (!(await idAnswer.isValid(req.params))) {
      return res.status(400).json({ error: 'invalid params' });
    }

    const schemaQuestion = Yup.object().shape({
      answer: Yup.string().required(),
    });

    if (!(await schemaQuestion.isValid(req.body))) {
      return res.status(400).json({ error: 'invalid answer' });
    }
    const id = req.params.id_answer;
    const helpOrderPast = await HelpOrders.findOne({
      where: { id, answer: null },
      include: [
        { model: Student, as: 'students', attributes: ['name', 'email'] },
      ],
    });

    if (!helpOrderPast) {
      return res.status(400).json('question not exist');
    }

    const helpOrder = await helpOrderPast.update({
      answer: req.body.answer,
      answer_at: new Date(),
    });

    const { name, email } = helpOrder.students;

    const { question, answer } = helpOrder;

    await Queue.add(AnswerMail.key, {
      name,
      email,
      question,
      answer,
    });

    return res.json({ helpOrder });
  }
}
export default new HelpOrdersController();
