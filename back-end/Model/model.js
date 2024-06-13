import { Sequelize, DataTypes } from 'sequelize';

// Database configuration
export const sequelize = new Sequelize('Voizzit-Assessment', 'postgres', 'shamsudeen123%', {
    host: 'localhost',
    dialect: 'postgres',
  });

  // model for User
  export const User = sequelize.define('User', {
    username: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    role: {
      type: DataTypes.STRING,
      defaultValue: 'user', // Default role is 'user'
    },
  });
  
  // models for Employee
  export const Employee = sequelize.define('Employee', {
    firstName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    address: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    designation: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });
  