import Post from '../models/Post';

class PostController {
  async store(req, res) {
    
  };

  async index(req, res) {
    return res.json({ ok: true })
  };
};  

export default new PostController();