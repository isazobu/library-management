
const { Sequelize } = require('sequelize');
import dotenv from 'dotenv';

dotenv.config();
export const sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASSWORD,
    {
        host: process.env.DB_HOST,
        dialect: 'postgres'
    }
);


sequelize.authenticate().then(() => {
  console.log('Connection has been established successfully.');
})

