import Sequelize, { Model } from 'sequelize';

class Post {
  static init(sequelize) {
    super.init({
      title: Sequelize.STRING,
      content: Sequelize.STRING,
    },
    {
      sequelize
    });
  };
};

export default Post;