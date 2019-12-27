import Sequelize from 'sequelize';
import mongoose from 'mongoose';

import User from '../app/models/User';
import Student from '../app/models/Student';
import Plan from '../app/models/Plan';
import Enrollment from '../app/models/Enrollment';
import Checkins from '../app/models/Checkins';
import HelpOrders from '../app/models/HelpOrders';

import databaseConfig from '../config/database';

require('dotenv/config');

const models = [User, Student, Plan, Enrollment, Checkins, HelpOrders];

class Database {
  constructor() {
    this.init();
    this.mongo();
    Enrollment.associate(this.connection.models);
    Checkins.associate(this.connection.models);
    HelpOrders.associate(this.connection.models);
  }

  init() {
    this.connection = new Sequelize(databaseConfig);

    models.map(model => model.init(this.connection));
  }

  mongo() {
    this.mongoConnection = mongoose.connect(process.env.MONGO_URL, {
      useNewUrlParser: true,
      useFindAndModify: true,
      useUnifiedTopology: true,
    });
  }
}

export default new Database();
