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
      return res.status(400).json({ error: 'Invalid or insufficient information' });
    }

    const { title, content, likes, shares } = req.body;

    const user_id = req.userId;

    const post = await Post.create({ title, content, likes, shares, user_id });

    return res.status(201).json(post);
  };

  async index(req, res) {
    const posts = await Post.findAll({
      include: [{
        model: User,
        as: 'author',
        attributes: ['id', 'name', 'nickname', 'email', 'age'], 
        required: true,
      }],
      attributes: ['id', 'title', 'content', 'createdAt'],
    });
    return res.status(200).json(posts);
  };

  async destroy(req, res) {
    const { id } = req.params;

    const userId = req.userId;

    const post = await Post.destroy({
      where: {
        id,
        user_id: userId,
      },
    });
    
    return res.status(204).json();
  };

  async update(req, res) {
    const { id } = req.params;

    const schema = Yup.object().shape({
      title: Yup.string(),
      content: Yup.string(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.json({ error: 'Invalid or insufficient information' });
    };

    const post = await Post.update(req.body, {
      where: {
        id,
        user_id: req.userId,
      },
    });

    return res.json({ ok: 'Post successfully updated!' });

  };
};  

export default new PostController();