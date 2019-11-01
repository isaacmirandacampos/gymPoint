import Sequelize, { Model } from 'sequelize';

class Help_orders extends Model {
  static init(sequelize) {
    super.init(
      {
        question: { type: Sequelize.STRING, allowNull: true },
        answer: { type: Sequelize.STRING, allowNull: true },
      },
      {
        sequelize,
        modelName: 'help_orders',
      }
    );
  }

  static associate(models) {
    this.belongsTo(models.Student, {
      foreignKey: 'student_id',
      as: 'help_olders',
    });
  }
}
export default Help_orders;
