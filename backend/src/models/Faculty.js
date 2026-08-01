const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

const Faculty = sequelize.define('Faculty', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  name: { type: DataTypes.STRING, allowNull: false },
  designation: { type: DataTypes.STRING, allowNull: false },
  department: { type: DataTypes.STRING, defaultValue: 'stem' },
  experience: { type: DataTypes.STRING },
  qualification: { type: DataTypes.STRING },
  image: { type: DataTypes.STRING }, // Local file path URL
  bio: { type: DataTypes.TEXT },
  awards: { type: DataTypes.STRING },
  subjects: { 
    type: DataTypes.JSON, 
    defaultValue: [] 
  }
}, { timestamps: true });

module.exports = Faculty;
