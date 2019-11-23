module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn('scheme', 'id', {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    });
  },

  down: queryInterface => {
    return queryInterface.removeColumn('scheme', 'id');
  },
};
