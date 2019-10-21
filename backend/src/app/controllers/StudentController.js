import * as Yup from 'yup';

import Students from '../models/Students';

class StudentController {
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
    const studentExist = await Students.findOne({
      where: { email: req.body.email },
    });

    if (studentExist) {
      return res.status(400).json('Student exist');
    }
    const { id, name, email } = await Students.create(req.body);
    return res.json({
      student: {
        id,
        name,
        email,
      },
    });
  }
}
export default new StudentController();
