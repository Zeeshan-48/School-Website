const express = require('express');
const cors = require('cors');
const path = require('path');
const helmet = require('helmet'); // We should install this, but for now we'll just require cors/express

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve uploaded files statically
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Basic route
app.get('/', (req, res) => {
  res.json({ message: 'Welcome to the School CMS API.' });
});

// Import Routes
const authRoutes = require('./routes/auth.routes');
const dashboardRoutes = require('./routes/dashboard.routes');
const facultyRoutes = require('./routes/faculty.routes');
const galleryRoutes = require('./routes/gallery.routes');
const careerRoutes = require('./routes/career.routes');
const admissionRoutes = require('./routes/admission.routes');
const inquiryRoutes = require('./routes/inquiry.routes');

app.use('/api/auth', authRoutes);
app.use('/api/dashboard', dashboardRoutes);
app.use('/api/faculty', facultyRoutes);
app.use('/api/gallery', galleryRoutes);
app.use('/api/careers', careerRoutes);
app.use('/api/admissions', admissionRoutes);
app.use('/api/inquiries', inquiryRoutes);

// Global Error Handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    success: false,
    message: err.message || 'Internal Server Error'
  });
});

module.exports = app;
