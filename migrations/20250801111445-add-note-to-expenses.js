'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    // ✅ Add 'note' column to 'Expenses' table
    await queryInterface.addColumn('Expenses', 'note', {
      type: Sequelize.STRING,
      allowNull: true, // optional field
    });
  },

  async down(queryInterface, Sequelize) {
    // ✅ Remove 'note' column if migration is rolled back
    await queryInterface.removeColumn('Expenses', 'note');
  }
};
