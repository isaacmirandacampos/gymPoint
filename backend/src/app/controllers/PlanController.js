import Plan from '../models/Plan';
import * as Yup from 'yup';

class PlanController {
  async index(req, res) {
    const Plans = await Plan.findAll({
      attributes: ['id', 'title', 'duration', 'price'],
      order: ['price'],
    });
    return res.json({ Plans });
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
    const PlanExist = await Plan.findOne({
      where: { title: req.body.title },
    });

    if (PlanExist) {
      return res.status(400).json({ error: 'Plan exist' });
    }

    const { title, duration, price } = await Plan.create(req.body);

    return res.json({ title, duration, price });
  }

  async update(req, res) {
    const schema = Yup.object().shape({
      title: Yup.string(),
      duration: Yup.number().integer(),
      price: Yup.number(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Invalid filds' });
    }

    const Plan = await Plan.findByPk(req.params.PlanId);

    if (!Plan) {
      return res.status(400).json({ error: 'Plan not exist' });
    }

    const { title, duration, price } = await Plan.update(req.body);

    return res.json({ title, duration, price });
  }

  async delete(req, res) {
    const plan = await Plan.findByPk(req.params.planId);

    if (!plan) {
      return res.status(400).json({ error: 'Plan not exist' });
    }
    await plan.destroy();

    return res.json({ success: 'Plan delete' });
  }
}
export default new PlanController();
