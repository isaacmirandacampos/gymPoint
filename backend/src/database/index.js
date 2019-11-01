import Sequelize from 'sequelize';
import mongoose from 'mongoose';

import User from '../app/models/User';
import Student from '../app/models/Student';
import Scheme from '../app/models/Scheme';
import Enrollment from '../app/models/Enrollment';
import Checkins from '../app/models/Checkins';
import Help_orders from '../app/models/Help_orders';

import databaseConfig from '../config/database';

const models = [User, Student, Scheme, Enrollment, Checkins, Help_orders];

class Database {
  constructor() {
    this.init();
    this.mongo();
    Enrollment.associate(this.connection.models);
    Checkins.associate(this.connection.models);
    Help_orders.associate(this.connection.models);
  }

  init() {
    this.connection = new Sequelize(databaseConfig);

    models.map(model => model.init(this.connection));
  }

  mongo() {
    this.mongoConnection = mongoose.connect(
      'mongodb://localhost:27017/gympoint',
      {
        useNewUrlParser: true,
        useFindAndModify: true,
        useUnifiedTopology: true,
      }
    );
  }
}

export default new Database();
