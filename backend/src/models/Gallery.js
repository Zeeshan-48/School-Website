const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

const Gallery = sequelize.define('Gallery', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  title: { type: DataTypes.STRING, allowNull: false },
  category: { type: DataTypes.STRING, allowNull: false }, // e.g., 'Campus', 'Events', 'Sports'
  type: { type: DataTypes.STRING, defaultValue: 'image' },
  caption: { type: DataTypes.TEXT },
  imagePath: { type: DataTypes.STRING, allowNull: false } // Cloudinary URL
}, { timestamps: true });

module.exports = Gallery;
