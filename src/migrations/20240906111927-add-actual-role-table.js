module.exports = {
  up: (queryInterface, Sequelize) =>
    queryInterface.createTable("Roles", {
      name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      description: {
        type: Sequelize.STRING,
      },
    }),
  down: (queryInterface, Sequelize) => queryInterface.dropTable("Roles"),
};
