import Sequelize, { Model } from 'sequelize';
import bcrypt from 'bcryptjs';

class User extends Model {
  static init(sequelize) {
    super.init({
      name: Sequelize.STRING,
      nickname: Sequelize.STRING,
      email: Sequelize.STRING,
      friends: Sequelize.ARRAY(Sequelize.STRING),
      hype: Sequelize.INTEGER,
      password: Sequelize.VIRTUAL,
      password_hash: Sequelize.STRING,
      age: Sequelize.INTEGER,
    },
    {
      sequelize
    });
    this.addHook('beforeSave', async (user) => {
      user.password_hash = await bcrypt.hash(user.password, 8);
    });
    return this;
  };
  async checkPassword(password) {
    return await bcrypt.compare(password, this.password_hash);
  };
};  

export default User;