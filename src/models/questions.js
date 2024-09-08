module.exports = (sequelize, DataTypes) => {
  const Question = sequelize.define(
    "Question",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      question: {
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
    },
    {
      timestamps: true, // adds `createdAt` and `updatedAt`
      paranoid: true, // adds `deletedAt`
    }
  );

  Question.associate = function (models) {
    // A Question belongs to one Exam
    Question.belongsTo(models.Exam, {
      foreignKey: "examId",
      as: "exam", // Alias for this association
      onDelete: "CASCADE", // Optional: If an exam is deleted, delete the related questions
    });

    Question.hasOne(models.Answer, {
      foreignKey: "questionId",
      as: "correctAnswer",
      onDelete: "CASCADE", // If a question is deleted, the associated answer should also be deleted
    });
  };

  return Question;
};
