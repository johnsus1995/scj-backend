module.exports = {
  up: (queryInterface, Sequelize) =>
    queryInterface.createTable("Users", {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      firstName: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      lastName: {
        type: Sequelize.STRING,
      },
      email: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
      },
      password: {
        type: Sequelize.STRING,
      },
      profilePic: {
        type: Sequelize.STRING,
      },
      isAdmin: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
      },
      verifyToken: {
        type: Sequelize.STRING,
        defaultValue: null,
      },
      isVerified: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.fn("NOW"),
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.fn("NOW"),
      },
      deletedAt: {
        type: Sequelize.DATE,
      },
    }),

  down: (queryInterface) => queryInterface.dropTable("Users"),
};
