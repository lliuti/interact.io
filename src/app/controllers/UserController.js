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
      return res.status(400).json({ error: 'Invalid or insufficient information' });
    };

    const { name, nickname, email, password, age } = req.body;

    const hype = 1;
    const friends = [];

    const doesExist = await User.findOne({ where: { email } });
  
    if (doesExist) {
      return res.status(400).json({ error: 'This e-mail is already in use' });
    };

    const user = await User.create({ name, nickname, email, password, age, hype, friends });

    const { id } = user;

    return res.status(201).json({ id, name, nickname, email, age, hype, friends });
  };

  async update(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string(),
      nickname: Yup.string(),
      email: Yup.string().email(),
      password: Yup.string(),
    });
    
    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Invalid or insufficient information' });
    }

    const user = await User.update(req.body, {
      where: {
        id: req.userId,
      },
    })

    return res.json({ ok: 'User successfully updated' });

  };

  async index(req, res) {
    const users = await User.findAll({
      attributes: ['id', 'name', 'nickname', 'email', 'age', 'createdAt']
    });
    return res.status(200).json(users);
  };
}

export default new UserController();