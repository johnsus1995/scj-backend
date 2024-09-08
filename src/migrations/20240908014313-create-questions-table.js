'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable("Questions",{
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      question:{
          type: Sequelize.STRING,
          allowNull:false
      },
      examId: {
        type: Sequelize.INTEGER,
        references: {
          model: "Exams",
          key: "id",
        },
        onDelete: "SET NULL",
        allowNull: true,
      },
    })
  },

  down: (queryInterface) => queryInterface.dropTable("Questions"),

};
