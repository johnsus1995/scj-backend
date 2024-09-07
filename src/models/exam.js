module.exports = (sequelize, DataTypes) => {
  const Exam = sequelize.define("Exam", {
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
  });

  // eslint-disable-next-line func-names
  Exam.associate = function (models) {
    //
  };

  return Exam;
};
