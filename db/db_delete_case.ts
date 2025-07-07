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

interface Case {
    id: number;
    plaintiff_full_name: string;
    email: string;
}

interface Correos {
    email: string;
}

// Borrar registros con correo inicie: 'rider.tester23' de: email_validation, preregistered_user, user

export async function borra_de_case(nombre: string): Promise<Case[]>{
  const connection = await mysql.createConnection({
    host: '35.184.254.180',
    user: 'root',
    password: 'Nh]?R`x#Sy001Z}~',
    database: 'rider',
  });
  const tabla = '\`case\`'
  const [rows] = await connection.execute(`DELETE FROM ${tabla} WHERE plaintiff_full_name LIKE "${nombre}%"`); 
  await connection.end();
  return rows as Case[];
}

export async function borra_de_preregistered_case(nombre: string): Promise<Case[]>{
  const connection = await mysql.createConnection({
    host: '35.184.254.180',
    user: 'root',
    password: 'Nh]?R`x#Sy001Z}~',
    database: 'rider',
  });
  const tabla = 'preregistered_case'
  const [rows] = await connection.execute(`DELETE FROM ${tabla} WHERE plaintiff_full_name LIKE "${nombre}%"`); 
  await connection.end();
  return rows as Case[];
}

export async function borra_de_preregistered_user(correo: string): Promise<Correos[]> {
  const connection = await mysql.createConnection({
    host: '35.184.254.180',
    user: 'root',
    password: 'Nh]?R`x#Sy001Z}~',
    database: 'rider',
  });

  const [rows] = await connection.execute(`DELETE FROM preregistered_user WHERE email LIKE "${correo}%"`); 
  await connection.end();
  return rows as Correos[];
}
