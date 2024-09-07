module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Drop the existing column if it exists
    await queryInterface.removeColumn('Roles', 'id');
    
    // Recreate the column with correct settings
    await queryInterface.addColumn('Roles', 'id', {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    });
  },

  down: async (queryInterface, Sequelize) => {
    // Drop the column in the down migration
    await queryInterface.removeColumn('Roles', 'id');
  },
};
