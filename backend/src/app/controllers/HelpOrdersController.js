import * as Yup from 'yup';
import Student from '../models/Student';
import Help_orders from '../models/Help_orders';

class Help_ordersController {
  async index(req, res) {
    const questions = await Help_orders.findAll({
      where: { answer: null },
      attributes: ['id', 'question'],
      include: [
        {
          model: Student,
          as: 'help_olders',
          attributes: ['id', 'name', 'email'],
        },
      ],
    });
    return res.json({ questions });
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

    const question = await Help_orders.create(req.body);
    return res.json({ question });
  }

  async update(req, res) {
    const idAnswer = Yup.object().shape({
      id_answer: Yup.number()
        .integer()
        .required(),
    });

    if (!(await idAnswer.isValid(req.params))) {
      return res.status(400).json({ error: 'error with student ID' });
    }

    const schemaQuestion = Yup.object().shape({
      answer: Yup.string().required(),
    });

    if (!(await schemaQuestion.isValid(req.body))) {
      return res.status(400).json({ error: 'error with answer' });
    }
    const id = req.params.id_answer;
    const question = await Help_orders.findOne({ where: { id, answer: null } });

    if (!question) {
      return res.status(400).json('question not exist');
    }
    req.body.answer_at = new Date();
    const questionAtt = await question.update(req.body);

    return res.json({ questionAtt });
  }
}
export default new Help_ordersController();
