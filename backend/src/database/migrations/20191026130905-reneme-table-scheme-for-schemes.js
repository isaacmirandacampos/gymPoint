module.exports = {
  up: queryInterface => {
    return queryInterface.renameTable('scheme', 'schemes');
  },

  down: queryInterface => {
    return queryInterface.dropTable('schemes', 'schemes');
  },
};
