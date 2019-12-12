import * as Yup from 'yup';

import Student from '../models/Student';

class StudentController {
  async index(req, res) {
    const { studentId } = req.params;

    if (studentId) {
      const student = await Student.findOne({ where: { id: studentId } });
      return res.json({ student });
    } else {
      const Students = await Student.findAll();
      return res.json({ Students });
    }
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

  async update(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string(),
      email: Yup.string().email(),
      idade: Yup.number(),
      peso: Yup.number(),
      altura: Yup.number(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Fields wrong' });
    }

    const { studentId } = req.params;

    const student = await Student.findByPk(studentId);

    if (!student) {
      return res.status(401).json({ error: 'Student not exist' });
    }

    await student.update(req.body);

    return res.status(200).json({ ok: 'update student' });
  }

  async delete(req, res) {
    const id = req.params.studentId;

    const student = await Student.findByPk(id);

    if (!student) {
      return res.status(400).json({ error: 'Student not exist' });
    }
    await student.destroy();
    return res.json({ success: 'Student delete' });
  }
}
export default new StudentController();
