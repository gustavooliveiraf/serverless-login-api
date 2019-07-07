'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Phones', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      userId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: {
            schema: 'security',
            tableName: 'Users'
          },
          key: 'id',
          as: 'user',
        }
      },
      numero: {
        type: Sequelize.BIGINT
      },
      ddd: {
        type: Sequelize.INTEGER
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    }, {
      schema: 'register'
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Phones');
  }
};