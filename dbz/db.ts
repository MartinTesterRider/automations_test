// db.ts

import { Sequelize } from 'sequelize';

export const sequelize = new Sequelize('rider', 'root', 'Nh]?R\`x#Sy001Z}~', {
  host: '35.184.254.180',
  dialect: 'mysql',
  logging: false, // opcional: desactiva logs SQL
});


/*
import 'dotenv/config';
import { Sequelize } from 'sequelize';
export const sequelize = new Sequelize(
  process.env.DB_NAME!,
  process.env.DB_USER!,
  process.env.DB_PASS!,
  {
    host: process.env.DB_HOST!,
    dialect: 'mysql',
  }
);
*/
