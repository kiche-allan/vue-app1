const { Pool } = require('pg');
const fs = require('fs');

// Connect to postgres default database to create todo_app
const adminPool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'postgres',
  password: 'Kiche@74',
  port: 5432,
});

async function setupDatabase() {
  const client = await adminPool.connect();
  try {
    console.log('Checking if todo_app database exists...');
    
    // Create database if it doesn't exist
    await client.query('CREATE DATABASE todo_app;').catch(() => {
      console.log('Database todo_app already exists');
    });
    
    // Connect to todo_app database
    const todoPool = new Pool({
      user: 'postgres',
      host: 'localhost',
      database: 'todo_app',
      password: 'Kiche@74',
      port: 5432,
    });
    
    const todoClient = await todoPool.connect();
    try {
      // Read and execute setup.sql
      const setupSQL = fs.readFileSync('./config/setup.sql', 'utf8');
      await todoClient.query(setupSQL);
      console.log('✓ Database setup complete!');
    } finally {
      todoClient.release();
      todoPool.end();
    }
  } catch (error) {
    console.error('Error setting up database:', error.message);
  } finally {
    client.release();
    adminPool.end();
  }
}

setupDatabase();
