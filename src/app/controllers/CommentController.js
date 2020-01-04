import * as Yup from 'yup';
import Comment from '../models/Comment';

class CommentController {
  async store(req, res) {
    const schema = Yup.object().shape({
      content: Yup.string().required()
    });

    if (!(await schema.isValid(req.body))) {
      return res.json({ error: 'Invalid or insufficient information' });
    };

    const { content } = req.body;
    const post_id = req.params.post_id;
    const user_id = req.userId;

    const comment = await Comment.create({ content, post_id, user_id });
    
    return res.json(comment);

  };
};

export default new CommentController();