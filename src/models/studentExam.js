module.exports = (sequelize, DataTypes) => {
  const StudentExam = sequelize.define(
    "StudentExam",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      studentId: {
        type: DataTypes.INTEGER,
        references: {
          model: "Users",
          key: "id",
        },
      },
      examId: {
        type: DataTypes.INTEGER,
        references: {
          model: "Exams",
          key: "id",
        },
      },
      startTime: {
        type: DataTypes.TIME,
        allowNull: true,
      },
      endTime: {
        type: DataTypes.TIME,
        allowNull: true,
      },
      submitted: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
      },
      score: {
        type: DataTypes.INTEGER,
        allowNull: true,
        defaultValue: 0,
      },
    },
    {
      timestamps: true,
      paranoid: true,
    }
  );

  StudentExam.associate = function (models) {
    // Exam.hasMany(models.Question, {
    //   foreignKey: "examId", // Foreign key in the Question model
    //   as: "questions", // Alias for this association
    //   onDelete: "CASCADE", // Optional: If an exam is deleted, delete related questions
    // });
    // Exam.hasMany(models.Answer, {
    //   foreignKey: "examId",
    //   as: "answers",
    //   onDelete: "CASCADE",
    // });
  };

  return StudentExam;
};
