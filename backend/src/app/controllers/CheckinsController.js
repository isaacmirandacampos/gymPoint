import { Op } from 'sequelize';
import * as Yup from 'yup';
import { addDays, startOfToday, endOfToday } from 'date-fns';
import Student from '../models/Student';
import Checkins from '../models/Checkins';

class CheckinsController {
  async index(req, res) {
    const schema = Yup.object().shape({
      student_id: Yup.number()
        .integer()
        .required(),
    });

    if (!(await schema.isValid(req.params))) {
      return res.status(400).json({ error: 'Invalid ID' });
    }
    const { student_id } = req.params;
    const { id, name, email } = await Student.findByPk(student_id);

    if (!name) {
      return res.status(400).json({ error: 'User not exist' });
    }

    const checkins = await Checkins.findAll({
      where: { student_id },
      attributes: ['id', 'createdAt'],
    });

    return res.json({ id, name, email, checkins });
  }

  async store(req, res) {
    const schema = Yup.object().shape({
      student_id: Yup.number()
        .integer()
        .required(),
    });

    if (!(await schema.isValid(req.params))) {
      return res.status(400).json('Invalid ID');
    }

    if (!(await Student.findByPk(req.params.student_id))) {
      return res.status(400).json('User not exist');
    }

    const MinusDays = addDays(startOfToday(), -7);
    const today = endOfToday();

    const checkinsSevenDays = await Checkins.findAll({
      where: {
        student_id: req.params.student_id,
        createdAt: {
          [Op.between]: [MinusDays, today],
        },
      },
      attributes: ['student_id', 'createdAt'],
      order: [['createdAt', 'desc']],
      include: [
        { model: Student, as: 'checkins', attributes: ['name', 'email'] },
      ],
    });

    if (checkinsSevenDays[4]) {
      return res.status(400).json('acess danied! 5 checkins in seven days');
    }

    const { student_id } = req.params;
    const nowChecking = await Checkins.create({ student_id });
    return res.json({ nowChecking, checkinsSevenDays });
  }
}
export default new CheckinsController();
