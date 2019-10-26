import * as Yup from 'yup';
import Scheme from '../models/Scheme';

class SchemeController {
  async index(req, res) {
    const scheme = await Scheme.findAll({
      attributes: ['id', 'title', 'duration', 'price'],
      order: ['price'],
    });
    return res.json(scheme);
  }

  async store(req, res) {
    const schema = Yup.object().shape({
      title: Yup.string().required(),
      duration: Yup.number()
        .integer()
        .required(),
      price: Yup.number().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Field invalid' });
    }
    const SchemeExist = await Scheme.findOne({
      where: { title: req.body.title },
    });

    if (SchemeExist) {
      return res.status(400).json({ error: 'Scheme exist' });
    }

    const { title, duration, price } = await Scheme.create(req.body);

    return res.json({ title, duration, price });
  }

  async update(req, res) {
    const schema = Yup.object().shape({
      title: Yup.string(),
      duration: Yup.number().integer(),
      price: Yup.number(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json('Invalid filds');
    }

    const scheme = await Scheme.findByPk(req.params.SchemeId);

    if (!scheme) {
      return res.status(400).json('Scheme not exist');
    }

    const { title, duration, price } = await scheme.update(req.body);

    return res.json({ title, duration, price });
  }

  async delete(req, res) {
    const scheme = await Scheme.findByPk(req.params.SchemeId);

    if (!scheme) {
      return res.status(400).json('Scheme not exist');
    }

    const { id, title, duration, price } = scheme;
    await scheme.destroy();

    return res.json({ id, title, duration, price });
  }
}
export default new SchemeController();
