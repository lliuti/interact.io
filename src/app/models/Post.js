import Sequelize, { Model } from 'sequelize';

class Post extends Model {
  static init(sequelize) {
    super.init({
      title: Sequelize.STRING,
      content: Sequelize.STRING,
    },
    {
      sequelize
    });
    return this;
  };

  static associate(models) {
    this.belongsTo(models.User, { foreignKey: 'user_id', as: 'author' });
    this.hasMany(models.Comment, { foreignKey: 'id', as: 'comments' });
  };
};

export default Post;