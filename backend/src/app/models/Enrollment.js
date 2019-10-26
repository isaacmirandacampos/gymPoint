import Sequelize, { Model } from 'sequelize';

class Enrollment extends Model {
  static init(sequelize) {
    super.init(
      {
        student_id: Sequelize.INTEGER,
        plan_id: Sequelize.INTEGER,
        start_date: Sequelize.DATE,
        end_date: Sequelize.DATE,
        price: Sequelize.FLOAT,
      },
      {
        sequelize,
      }
    );
  }

  static associate(models) {
    this.belongsTo(models.Student, {
      foreignKey: 'Student_id',
      as: 'student',
    });
    this.belongsTo(models.Scheme, {
      foreignKey: 'scheme_id',
      as: 'scheme',
    });
  }
}
export default Enrollment;
