module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    "User",
    {
      firstName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      lastName: {
        type: DataTypes.STRING,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      password: {
        type: DataTypes.STRING,
      },
      profilePic: {
        type: DataTypes.STRING,
      },
      isAdmin: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
      verifyToken: {
        type: DataTypes.STRING,
        defaultValue: null,
      },
      isVerified: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
      roleId: {
        type: DataTypes.INTEGER,
        references: {
          model: "Roles", // The name of the Role model
          key: "id",
        },
        onDelete: "SET NULL", // Handle deletion of roles
        allowNull: true, // Set to false if role is required
      },
    },
    {
      defaultScope: {
        attributes: { exclude: ["password", "verifyToken", "isAdmin"] },
      },
      scopes: {
        withSecretColumns: {
          attributes: { include: ["password", "verifyToken", "isAdmin"] },
        },
      },
      timestamps: true,
      paranoid: true,
    }
  );

  User.associate = (models) => {
    User.belongsTo(models.Role, {
      foreignKey: "roleId",
      as: "role", // alias for the association
      onDelete: "SET NULL", // handle deletion of roles
    });
  };

  return User;
};

