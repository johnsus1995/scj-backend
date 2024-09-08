module.exports = (sequelize, DataTypes) => {
  const Answer = sequelize.define(
    "Answer",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      answer: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      examId: {
        type: DataTypes.INTEGER,
        references: {
          model: "Exams",
          key: "id",
        },
      },
      questionId: {
        type: DataTypes.INTEGER,
        references: {
          model: "Questions",
          key: "id",
        },
      },
    },
    {
      timestamps: true, // adds `createdAt` and `updatedAt`
      paranoid: true, // adds `deletedAt`
    }
  );

  Answer.associate = function (models) {
    Answer.belongsTo(models.Question, {
      foreignKey: "id",
      as: "question",
      onDelete: "CASCADE", 
    });

    Answer.belongsTo(models.Exam, {
      foreignKey: "id",
      as: "exam",
      onDelete: "CASCADE",
    });
    
  };

  return Answer;
};
