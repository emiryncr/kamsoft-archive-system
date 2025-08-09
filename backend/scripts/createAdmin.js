import bcrypt from 'bcrypt';
import User from '../models/User.js';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

// Get the directory of the current module
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Load .env from the backend root directory
dotenv.config({ path: join(__dirname, '..', '.env') });

const createAdmin = async () => {
  try {
    // Check if MONGODB_URI exists
    if (!process.env.MONGO_URI) {
      console.error('MONGODB_URI not found in environment variables');
      console.log('Please make sure your .env file exists in the backend root directory');
      process.exit(1);
    }

    console.log('Connecting to MongoDB...');
    await mongoose.connect(process.env.MONGO_URI);
    
    // Check if admin already exists
    const existingAdmin = await User.findOne({ username: 'admin' });
    if (existingAdmin) {
      console.log('Admin user already exists!');
      console.log('Username: admin');
      process.exit(0);
    }
    
    const hashedPassword = await bcrypt.hash('admin', 10);
    
    const admin = new User({
      name: 'System Administrator',
      username: 'admin',
      email: 'admin@kamsoft.com',
      password: hashedPassword,
      role: 'admin'
    });

    await admin.save();
    console.log('✅ Admin created successfully!');
    console.log('📝 Login credentials:');
    console.log('   Username: admin');
    console.log('   Password: admin');
    console.log('   Email: admin@kamsoft.com');
    console.log('   Role: admin');
    process.exit(0);
  } catch (error) {
    console.error('❌ Error creating admin:', error.message);
    process.exit(1);
  } finally {
    // Ensure MongoDB connection is closed
    await mongoose.connection.close();
  }
};

createAdmin();