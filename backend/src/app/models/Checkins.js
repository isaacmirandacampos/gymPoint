import Sequelize, { Model } from 'sequelize';

class Checkins extends Model {
  static init(sequelize) {
    super.init(
      {
        student_id: Sequelize.NUMBER,
      },
      { sequelize, modelName: 'Checkins' }
    );
  }

  static associate(models) {
    this.belongsTo(models.Student, {
      foreignKey: 'student_id',
      as: 'checkins',
    });
  }
}

export default Checkins;
