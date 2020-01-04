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

    const { email } = req.body;

    const doesExist = await User.findOne({ where: { email } });
  
    if (doesExist) {
      return res.json({ error: 'This e-mail is already in use' });
    };

    const user = await User.create(req.body);

    const { id, name, nickname, age } = user;

    return res.json({ id, name, nickname, email, age });
  };

  async index(req, res) {
    const users = await User.findAll({
      attributes: ['id', 'name', 'nickname', 'email', 'age', 'createdAt']
    });
    return res.json(users);
  };
}

export default new UserController();