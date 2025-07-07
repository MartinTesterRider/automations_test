// db.ts
import mysql from 'mysql2/promise';
//import dotenv from 'dotenv'
//dotenv.config()

interface User {
  id: number;
  email: string;
  sms_code: string;
}

interface Preregistered {
  id: number;
  email: string;
}

interface Preregistered_referrer {
  id: number;
}

interface Preregistered_investor {
  id: number;
}

export async function getUsers(correo: string): Promise<User[]> {
  const connection = await mysql.createConnection({
    host: '35.184.254.180',
    user: 'root',
    password: 'Nh]?R`x#Sy001Z}~',
    database: 'rider',
  });

  const [rows] = await connection.execute(`SELECT id, email, sms_code FROM user WHERE email = "${correo}"`); // ejemplo con tabla "users"
  await connection.end();
  return rows as User[];
}

export async function getTwo_Factor(correo: string): Promise<User[]> {
  const connection = await mysql.createConnection({
    host: '35.184.254.180',
    user: 'root',
    password: 'Nh]?R`x#Sy001Z}~',
    database: 'rider',
  });

  const [rows] = await connection.execute(`SELECT id, email, sms_code FROM user WHERE email = "${correo}"`); // ejemplo con tabla "users"
  await connection.end();
  return rows as User[];
}

export async function preregistered_user(correo: string): Promise<Preregistered[]> {
  const connection = await mysql.createConnection({
    host: '35.184.254.180',
    user: 'root',
    password: 'Nh]?R`x#Sy001Z}~',
    database: 'rider',
  });

  const [rows] = await connection.execute(`SELECT id, email FROM preregistered_user WHERE email = "${correo}"`); // ejemplo con tabla "users"
  await connection.end();
  return rows as Preregistered[];
}

export async function preregistered_referrer(correo: string): Promise<Preregistered_referrer[]> {
  const connection = await mysql.createConnection({
    host: '35.184.254.180',
    user: 'root',
    password: 'Nh]?R`x#Sy001Z}~',
    database: 'rider',
  });

  const [rows] = await connection.execute(`SELECT preregistered_referrer.id FROM preregistered_user INNER JOIN preregistered_referrer 
ON preregistered_user.id = preregistered_referrer.preregistered_user_id WHERE email = "${correo}"`); // ejemplo con tabla "users"
  await connection.end();
  return rows as Preregistered_referrer[];
}

export async function preregistered_investor(correo: string): Promise<Preregistered_investor[]> {
  const connection = await mysql.createConnection({
    host: '35.184.254.180',
    user: 'root',
    password: 'Nh]?R`x#Sy001Z}~',
    database: 'rider',
  });

  const [rows] = await connection.execute(`SELECT preregistered_investor.id FROM preregistered_user INNER JOIN preregistered_investor 
ON preregistered_user.id = preregistered_investor.preregistered_user_id WHERE email = "${correo}"`); // ejemplo con tabla "users"
  await connection.end();
  return rows as Preregistered_investor[];
}
