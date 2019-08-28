
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER,
    },
    name: {
      allowNull: false,
      type: DataTypes.STRING,
    },
    email: {
      allowNull: false,
      type: DataTypes.STRING,
    },
    password: {
      allowNull: false,
      type: DataTypes.STRING,
    },
    guid: {
      allowNull: false,
      type: DataTypes.STRING,
    },
    lastLogin: {
      allowNull: false,
      type: DataTypes.DATE,
    },
    token: {
      allowNull: false,
      type: DataTypes.STRING,
    },

    cep: {
      allowNull: false,
      type: DataTypes.STRING,
    },
    lat: {
      type: DataTypes.FLOAT,
    },
    lng: {
      type: DataTypes.FLOAT,
    },
    createdAt: {
      allowNull: false,
      type: DataTypes.DATE,
    },
    updatedAt: {
      allowNull: false,
      type: DataTypes.DATE,
    },
  }, {
    schema: 'security',
  });
  User.associate = function (models) {
    User.hasMany(models.Phone, {
      foreignKey: 'userId',
      as: 'phones',
    });
  };
  return User;
};
