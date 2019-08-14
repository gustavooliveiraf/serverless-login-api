'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Users', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        allowNull: false,
        type: Sequelize.STRING
      },
      email: {
        allowNull: false,
        type: Sequelize.STRING
      },
      password: {
        allowNull: false,
        type: Sequelize.STRING
      },
      guid: {
        allowNull: false,
        type: Sequelize.STRING
      },
      lastLogin: {
        allowNull: false,
        type: Sequelize.DATE
      },
      token: {
        allowNull: false,
        type: Sequelize.STRING
      },
      cep: {
        allowNull: false,
        type: Sequelize.STRING
      },
      coordinate: {
        allowNull: false,
        type: Sequelize.GEOMETRY
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
      schema: 'security'
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Users');
  }
};