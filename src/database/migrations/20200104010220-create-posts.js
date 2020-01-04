'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
      return queryInterface.createTable('posts', { 
        id: {
          type: Sequelize.INTEGER,
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
        },
        title: {
          type: Sequelize.STRING,
          allowNull: true,
        },
        content: {
          type: Sequelize.STRING,
          allowNull: false,
        },
        likes: {
          type: Sequelize.INTEGER,
          allowNull: true,
          default: 0,
        },
        shares: {
          type: Sequelize.INTEGER,
          allowNull: true,
          default: 0,
        },
        created_at: {
          type: Sequelize.DATE,
          allowNull: false,
        },
        updated_at: {
          type: Sequelize.DATE,
          allowNull: false,
        },
      });
  },

  down: (queryInterface) => {
      return queryInterface.dropTable('posts');
  }
};
