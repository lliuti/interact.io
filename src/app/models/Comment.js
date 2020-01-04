import Sequelize, { Model } from 'sequelize';

class Comment extends Model {
  static init(sequelize) {
    super.init({
      content: Sequelize.STRING,
      post_id: Sequelize.INTEGER, 
      user_id: Sequelize.INTEGER
    },
    {
      sequelize,
    });
    return this;
  };

  // static associate(models) {
  //   this.belongsTo(models.Post, { foreignKey: 'post_id', as: 'post' });
  // };
};

export default Comment;