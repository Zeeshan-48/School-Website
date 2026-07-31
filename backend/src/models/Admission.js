const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

const Admission = sequelize.define('Admission', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  studentName: { type: DataTypes.STRING, allowNull: false },
  gender: { type: DataTypes.STRING },
  dob: { type: DataTypes.DATEONLY },
  grade: { type: DataTypes.STRING, allowNull: false },
  parentName: { type: DataTypes.STRING, allowNull: false },
  email: { type: DataTypes.STRING },
  phone: { type: DataTypes.STRING, allowNull: false },
  address: { type: DataTypes.TEXT },
  transportRequired: { type: DataTypes.STRING, defaultValue: 'No' },
  status: {
    type: DataTypes.ENUM('Submitted', 'Under Review', 'Approved', 'Rejected'),
    defaultValue: 'Submitted'
  }
}, { timestamps: true });

module.exports = Admission;
