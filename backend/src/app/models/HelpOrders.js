import Sequelize, { Model } from 'sequelize';

class HelpOrders extends Model {
  static init(sequelize) {
    super.init(
      {
        question: { type: Sequelize.STRING, allowNull: true },
        answer: { type: Sequelize.STRING, allowNull: true },
        answer_at: { type: 'TIMESTAMP', allowNull: true },
      },
      {
        sequelize,
        modelName: 'HelpOrders',
      }
    );
  }

  static associate(models) {
    this.belongsTo(models.Student, {
      foreignKey: 'student_id',
      as: 'student',
    });
  }
}
export default HelpOrders;
