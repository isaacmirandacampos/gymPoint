import * as Yup from 'yup';

import Student from '../models/Student';

class StudentController {
  async index(req, res) {
    const Students = await Student.findAll();
    res.json({ Students });
  }

  async store(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string().required(),

      email: Yup.string()
        .email()
        .required(),

      idade: Yup.number()
        .required()
        .positive()
        .integer(),

      peso: Yup.number()
        .positive()
        .required(),

      altura: Yup.number()
        .required()
        .positive(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json('Invalid Body');
    }
    const studentExist = await Student.findOne({
      where: { email: req.body.email },
    });

    if (studentExist) {
      return res.status(400).json({ error: 'Student exist' });
    }
    const { id, name, email } = await Student.create(req.body);
    return res.json({
      student: {
        id,
        name,
        email,
      },
    });
  }

  async delete(req, res) {
    const { id } = req.query;

    const student = await Student.findByPk(id);

    if (!student) {
      return res.status(400).json({ error: 'Student not exist' });
    }

    const { name } = student;
    await student.destroy();

    return res.json({ name });
  }
}
export default new StudentController();
