import * as Yup from 'yup';
import User from '../models/User';

class UserController {
  async store(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      nickname: Yup.string(),
      email: Yup.string().email().required(),
      password: Yup.string().required(),
      age: Yup.number().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.json({ error: 'Invalid or insufficient information' });
    };

    const { name, nickname, email, password, age } = req.body;

    const hype = 1;
    const friends = [];

    const doesExist = await User.findOne({ where: { email } });
  
    if (doesExist) {
      return res.json({ error: 'This e-mail is already in use' });
    };

    const user = await User.create({ name, nickname, email, password, age, hype, friends });

    const { id } = user;

    return res.json({ id, name, nickname, email, age, hype, friends });
  };

  async index(req, res) {
    const users = await User.findAll({
      attributes: ['id', 'name', 'nickname', 'email', 'age', 'createdAt']
    });
    return res.json(users);
  };
}

export default new UserController();