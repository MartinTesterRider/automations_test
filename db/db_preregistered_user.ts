// db.ts
import mysql from 'mysql2/promise';

interface User {
  id: number;
  email: string;
}

export async function getUsers(): Promise<User[]> {
  const connection = await mysql.createConnection({
    host: '35.184.254.180',
    user: 'root',
    password: 'Nh]?R`x#Sy001Z}~',
    database: 'rider',
  });

  const [rows] = await connection.execute('SELECT id, email FROM preregistered_user WHERE email = "rider.tester23+e2e0monitor1@gmail.com"');
  await connection.end();
  return rows as User[];
}