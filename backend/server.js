require('dotenv').config();
const app = require('./src/app');
const { sequelize, testConnection } = require('./src/config/database');

const PORT = process.env.PORT || 5000;

const { seedAdmin } = require('./src/controllers/auth.controller');

// Start Server & Connect to DB
const startServer = async () => {
  try {
    // Test DB connection
    await testConnection();

    // Sync models (in development, alter is fine. Remove for production)
    await sequelize.sync(); 
    
    // Seed initial admin if not exists
    await seedAdmin();

    app.listen(PORT, () => {
      console.log(`🚀 Server is running on port ${PORT}`);
    });
  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
};

startServer();
