import * as Yup from 'yup';
import Post from '../models/Post';
import User from '../models/User';
import Comment from '../models/Comment';

class PostController {
  async store(req, res) {
    const schema = Yup.object().shape({
      title: Yup.string(),
      content: Yup.string().required(),
      likes: Yup.number(),
      shares: Yup.number(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.json({ error: 'Invalid or insufficient information' });
    }

    const { title, content, likes, shares } = req.body;

    const user_id = req.userId;

    const post = await Post.create({ title, content, likes, shares, user_id });

    return res.json(post);
  };

  async index(req, res) {
    const posts = await Post.findAll({
      include: [{
        model: User,
        as: 'author',
        attributes: ['id', 'name', 'nickname', 'email', 'age'], 
      }],
      include: [{
        model: Comment,
        as: 'comments',
      }],
    });
    return res.json(posts);
  };
};  

export default new PostController();