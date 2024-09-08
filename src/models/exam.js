module.exports = (sequelize, DataTypes) => {
  const Exam = sequelize.define("Exam", {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    createdBy: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    duration: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    isPublished: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      defaultValue: false,
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    updatedAt: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    deletedAt: {
      type: DataTypes.DATE,
    },
  });

  // eslint-disable-next-line func-names
  Exam.associate = function (models) {
    // An Exam has many Questions
    Exam.hasMany(models.Question, {
      foreignKey: "examId", // Foreign key in the Question model
      as: "questions", // Alias for this association
      onDelete: "CASCADE", // Optional: If an exam is deleted, delete related questions
    });

    Exam.hasMany(models.Answer, {
      foreignKey: "examId",
      as: "answers",
      onDelete: "CASCADE", 
    });
  };


  return Exam;
};
