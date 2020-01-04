'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
      return queryInterface.createTable('comments', { 
        id: {
          type: Sequelize.INTEGER,
          allowNull: false,
          primaryKey: true,
          autoIncrement: true,
        },
        content: {
          type: Sequelize.STRING,
          allowNull: false,
        },
        post_id: {
          type: Sequelize.INTEGER,
          references: { model: 'posts', key: 'id' },
          allowNull: false,
          onDelete: 'SET NULL',
          onUpdate: 'CASCADE',
        },
        user_id: {
          type: Sequelize.INTEGER,
          references: { model: 'users', key: 'id' },
          allowNull: false,
          onDelete: 'SET NULL',
          onUpdate: 'CASCADE',
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
      return queryInterface.dropTable('comments');
  }
};
