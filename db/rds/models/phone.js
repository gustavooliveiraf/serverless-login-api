
module.exports = (sequelize, DataTypes) => {
  const Phone = sequelize.define('Phone', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER,
    },
    userId: {
      allowNull: false,
      type: DataTypes.INTEGER,
      references: {
        model: {
          schema: 'security',
          tableName: 'Users',
        },
        key: 'id',
        as: 'user',
      },
    },
    number: {
      type: DataTypes.BIGINT,
    },
    ddd: {
      type: DataTypes.INTEGER,
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
    schema: 'register',
    defaultScope: {
      attributes: {
        exclude: ['userId', 'createdAt', 'updatedAt'],
      },
    },
  });
  Phone.associate = function (models) {
    Phone.belongsTo(models.User, {
      foreignKey: 'userId',
    });
  };
  return Phone;
};
