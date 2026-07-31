const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');
const Career = require('./Career');

const JobApplicant = sequelize.define('JobApplicant', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  fullName: { type: DataTypes.STRING, allowNull: false },
  email: { type: DataTypes.STRING, allowNull: false },
  phone: { type: DataTypes.STRING, allowNull: false },
  experience: { type: DataTypes.STRING },
  coverLetter: { type: DataTypes.TEXT },
  resumePath: { type: DataTypes.STRING }, // Cloudinary URL
  status: {
    type: DataTypes.ENUM('Submitted', 'Under Review', 'Shortlisted', 'Rejected'),
    defaultValue: 'Submitted'
  }
}, { timestamps: true });

// Relationships
Career.hasMany(JobApplicant, { foreignKey: 'jobId', as: 'applicants' });
JobApplicant.belongsTo(Career, { foreignKey: 'jobId', as: 'job' });

module.exports = JobApplicant;
