module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn("Users", "roleId", {
      type: Sequelize.INTEGER,
      references: {
        model: "Roles",
        key: "id",
      },
      onDelete: "SET NULL",
      allowNull: true,
    });
  },

  down: (queryInterface) => {
    return queryInterface.removeColumn("Users", "roleId");
  },
};