import * as Yup from 'yup';
import Comment from '../models/Comment';
import User from '../models/User';

class CommentController {
  async store(req, res) {
    const schema = Yup.object().shape({
      content: Yup.string().required()
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Invalid or insufficient information' });
    };

    const { content } = req.body;
    const post_id = req.params.post_id;
    const user_id = req.userId;

    const comment = await Comment.create({ content, post_id, user_id });
    
    return res.status(201).json(comment);

  };

  async index(req, res) {
    const comments = await Comment.findAll({
      where: { post_id : req.params.post_id },
      include: [{
        model: User,
        as: 'author',
        attributes: ['id', 'name', 'nickname', 'email']
      }],
      attributes: ['id', 'content', 'createdAt'],
    })

    return res.status(200).json(comments);
  };
};

export default new CommentController();