import { Op } from 'sequelize';
import jwt from 'jsonwebtoken';
import User from '../models/User';
import auth from '../../config/auth';

class SessionController {
  async store(req, res) {
    const { email, nickname, password } = req.body;

    const user = await User.findOne({ 
      where: { 
        [Op.or]: [
          { nickname }, 
          { email },
        ] 
      },
    });

    if (!user) {
      return res.json({ error: 'User not found' });
    };

    if (!(await user.checkPassword(password))) {
      return res.json({ error: 'Password does not match!' });
    }

    const { id, name, age } = user;

    return res.json({
      user: { id, name, nickname, email, age },
      token: jwt.sign({id}, auth.secret, {
        expiresIn: auth.expiresIn
      })
    });
  };
};

export default new SessionController();