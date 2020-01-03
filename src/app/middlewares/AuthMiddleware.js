import { promisify } from 'util';
import jwt from 'jsonwebtoken';
import auth from '../../config/auth';

export default async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.json({ error: 'Token not provided' });
  };

  const [, token] = authHeader.split(' ');

  try {
    const decoded = await promisify(jwt.verify)(token, auth.secret);
    req.userId = decoded.id;
    return next();
  } catch (e) {
    return res.json({ error: 'Invalid token' });
  };
};