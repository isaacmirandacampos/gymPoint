import * as Yup from 'yup';
import Student from '../models/Student';
import HelpOrders from '../models/HelpOrders';

import HelpOrdersMail from '../jobs/HelpOrdersMail';
import Queue from '../../lib/Queue';

class HelpOrdersController {
  async index(req, res) {
    const helpOrders = await HelpOrders.findAll({
      where: { answer: null },
      attributes: ['id', 'question'],
      include: [
        {
          model: Student,
          as: 'students',
          attributes: ['id', 'name', 'email'],
        },
      ],
    });
    return res.json({ helpOrders });
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
    const question = await HelpOrders.findOne({
      where: { id, answer: null },
      include: [
        { model: Student, as: 'students', attributes: ['name', 'email'] },
      ],
    });

    if (!question) {
      return res.status(400).json('question not exist');
    }
    req.body.answerAt = new Date();

    const questionAtt = await question.update({
      answer: req.body.answer,
      answer_at: new Date(),
    });
    const { helpOrders, ask, answer } = questionAtt;
    await Queue.add(HelpOrdersMail.key, { helpOrders, ask, answer });

    return res.json({ questionAtt });
  }
}
export default new HelpOrdersController();
