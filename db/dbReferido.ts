// db.ts
import mysql from 'mysql2/promise';

interface User {
  id: number;
  code: string;
  email: string;
}

export async function getUsers(): Promise<User[]> {
  const connection = await mysql.createConnection({
    host: '35.184.254.180',
    user: 'root',
    password: 'Nh]?R`x#Sy001Z}~',
    database: 'rider',
  });

  const [rows] = await connection.execute('SELECT id, email, sms_code FROM user WHERE email = "rider.tester23+e2ereferido2@gmail.com"'); // ejemplo con tabla "users"
  await connection.end();
  return rows as User[];
}