// models/User.ts
import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../dbz/db';

export class User extends Model {
  public id!: number;
  public email!: CharacterData;
  public first_name!: string;
  public sms_code!: number;
}

User.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    email: {
      type: DataTypes.CHAR,
      allowNull: false, // opcional
    },
    first_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    sms_code: {
      type: DataTypes.CHAR,
      allowNull: false,
    } 
  },
  {
    tableName: 'user',
    sequelize,
    timestamps: false, // cambia a true si tienes createdAt/updatedAt
  }
);
