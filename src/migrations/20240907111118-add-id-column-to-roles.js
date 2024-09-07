module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn("Roles", "id", {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    });
  },

  down: (queryInterface) => {
    return queryInterface.removeColumn("Roles", "id");
  },
};
