// db.ts
import mysql from 'mysql2/promise';
//import dotenv from 'dotenv'
//dotenv.config()

interface User {
  id: number;
  code: string;
  email: string;
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

  const [rows] = await connection.execute(`SELECT id, email, sms_code FROM user WHERE email LIKE "${correo}%"`); // ejemplo con tabla "users"
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

export async function referido_user(correo: string): Promise<Preregistered[]> {
  const connection = await mysql.createConnection({
    host: '35.184.254.180',
    user: 'root',
    password: 'Nh]?R`x#Sy001Z}~',
    database: 'rider',
  });

/*
SELECT preregistered_user.id, preregistered_referrer.id, preregistered_user.email, preregistered_referrer.preregistered_user_id FROM preregistered_user INNER JOIN preregistered_referrer ON preregistered_user.id = preregistered_referrer.preregistered_user_id WHERE email LIKE "rider.tester23%";
*/

  const [rows] = await connection.execute(`SELECT preregistered_referrer.id, preregistered_user.email FROM preregistered_user INNER JOIN preregistered_referrer ON preregistered_user.id = preregistered_referrer.preregistered_user_id WHERE email LIKE "${correo}%"`); 
  await connection.end();
  return rows as Preregistered[];
}

//DELETE FROM terms_and_conditions_agreements WHERE user_id =
export async function borra_terms_and_conditions_agreements(id: string): Promise<Preregistered_referrer[]> {
  const connection = await mysql.createConnection({
    host: '35.184.254.180',
    user: 'root',
    password: 'Nh]?R`x#Sy001Z}~',
    database: 'rider',
  });

  const [rows] = await connection.execute(`DELETE FROM terms_and_conditions_agreements WHERE user_id = "${id}"`); // ejemplo con tabla "users"
  await connection.end();
  return rows as Preregistered_referrer[];
}

export async function borrar_id(id: string): Promise<Preregistered_referrer[]> {
  const connection = await mysql.createConnection({
    host: '35.184.254.180',
    user: 'root',
    password: 'Nh]?R`x#Sy001Z}~',
    database: 'rider',
  });

  const [rows] = await connection.execute(`DELETE FROM preregistered_referrer WHERE id = "${id}"`); // ejemplo con tabla "users"
  await connection.end();
  return rows as Preregistered_referrer[];
}

// Borrar registros con correo inicie: 'rider.tester23' de: email_validation, preregistered_user, user

export async function borra_de_email_validation(correo: string): Promise<User[]>{
  const connection = await mysql.createConnection({
    host: '35.184.254.180',
    user: 'root',
    password: 'Nh]?R`x#Sy001Z}~',
    database: 'rider',
  });

  const [rows] = await connection.execute(`DELETE FROM email_validation WHERE email LIKE "${correo}%"`); // ejemplo con tabla "users"
  await connection.end();
  return rows as User[];
}

export async function borra_de_preregistered_user(correo: string): Promise<User[]>{
  const connection = await mysql.createConnection({
    host: '35.184.254.180',
    user: 'root',
    password: 'Nh]?R`x#Sy001Z}~',
    database: 'rider',
  });

  const [rows] = await connection.execute(`DELETE FROM preregistered_user WHERE email LIKE "${correo}%"`);
  await connection.end();
  return rows as User[];
}

// Incumplimito e2e1 de Contrato
export async function borra_case(correo: string): Promise<User[]>{
  const connection = await mysql.createConnection({
    host: '35.184.254.180',
    user: 'root',
    password: 'Nh]?R`x#Sy001Z}~',
    database: 'rider',
  });

  const [rows] = await connection.execute(`DELETE FROM case WHERE case.plaintiff_full_name LIKE "${correo}%"`);
  await connection.end();
  return rows as User[];
}


export async function borra_de_user(correo: string): Promise<User[]>{
  const connection = await mysql.createConnection({
    host: '35.184.254.180',
    user: 'root',
    password: 'Nh]?R`x#Sy001Z}~',
    database: 'rider',
  });

  const [rows] = await connection.execute(`DELETE FROM user WHERE email LIKE "${correo}%"`); // ejemplo con tabla "users"
  await connection.end();
  return rows as User[];
}

/*

  const [rows2] = await connection.execute(`DELETE FROM preregistered_user WHERE email LIKE "${correo}%"`); // ejemplo con tabla "users"
  await connection.end();

  const [rows] = await connection.execute(`DELETE FROM user WHERE email LIKE "${correo}%"`); // ejemplo con tabla "users"
  await connection.end();
*/

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
