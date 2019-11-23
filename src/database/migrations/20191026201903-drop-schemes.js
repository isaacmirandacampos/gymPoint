module.exports = {
  up: queryInterface => {
    return queryInterface.dropTable('schemes');
  },
};
