module.exports = (sequelize, DataTypes) => {
    const StudentAnswer = sequelize.define(
      "StudentAnswer",
      {
        id: {
          type: DataTypes.INTEGER,
          primaryKey: true,
          autoIncrement: true,
          allowNull: false,
        },
        studentExamId: {
          type: DataTypes.INTEGER,
          references: {
            model: "StudentExams",
            key: "id",
          },
        },
        // examId: {
        //   type: DataTypes.INTEGER,
        //   references: {
        //     model: "Exams",
        //     key: "id",
        //   },
        // },
        questionId: {
            type: DataTypes.INTEGER,
            references: {
              model: "Questions",
              key: "id",
            },
          },
        answer: {
          type: DataTypes.STRING,
          allowNull: true,
        },
        marks: {
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
  
    StudentAnswer.associate = function (models) {
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
  
    return StudentAnswer;
  };
  