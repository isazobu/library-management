
const { Sequelize } = require('sequelize');

export const sequelize = new Sequelize('case_study', 'postgres', 'mysecretpassword', {
    host: 'localhost',
    dialect: 'postgres'
  });


sequelize.authenticate().then(() => {
  console.log('Connection has been established successfully.');
})

