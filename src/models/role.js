module.exports = (sequelize, DataTypes) => {
  const Role = sequelize.define(
    "Role",
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      timestamps: true,
      paranoid: true,
    }
  );

  // eslint-disable-next-line func-names
  Role.associate = function (models) {
    Role.hasMany(models.User, {
      foreignKey: "roleId",
      as: "users", // alias for the association
    });
  };

  return Role;
};
