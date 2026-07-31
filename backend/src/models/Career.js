const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

const Career = sequelize.define('Career', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  title: { type: DataTypes.STRING, allowNull: false },
  department: { type: DataTypes.STRING, allowNull: false },
  location: { type: DataTypes.STRING },
  type: { type: DataTypes.STRING },
  experience: { type: DataTypes.STRING },
  qualification: { type: DataTypes.STRING },
  salary: { type: DataTypes.STRING },
  description: { type: DataTypes.TEXT },
  responsibilities: { type: DataTypes.TEXT }, // Stored as a single string, lines separated by \n
  status: {
    type: DataTypes.ENUM('Open', 'Closed'),
    defaultValue: 'Open'
  }
}, { timestamps: true });

module.exports = Career;
