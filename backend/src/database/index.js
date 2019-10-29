import Sequelize from 'sequelize';

import User from '../app/models/User';
import Student from '../app/models/Student';
import Scheme from '../app/models/Scheme';
import Enrollment from '../app/models/Enrollment';

import databaseConfig from '../config/database';

const models = [User, Student, Scheme, Enrollment];

class Database {
  constructor() {
    this.init();
    Enrollment.associate(this.connection.models);
  }

  init() {
    this.connection = new Sequelize(databaseConfig);

    models.map(model => model.init(this.connection));
  }
}

export default new Database();
