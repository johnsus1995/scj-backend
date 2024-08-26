import { Sequelize } from 'sequelize';
import { config } from 'dotenv';

config();

const options = {
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT,
  dialect: 'postgres',
  host: process.env.DB_HOST,
  sync: { alter: true, logging: (message) => console.log(message) },
  logging: (message) => console.log(message),
};

const sequelize = new Sequelize(options);

export default sequelize;
