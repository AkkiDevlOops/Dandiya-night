// lib/mongodb.js
import mongoose from 'mongoose';
import { configDotenv } from 'dotenv';
import dotenv from 'dotenv';
import path from 'path';

// Force dotenv to load from your exact project root
dotenv.config({ path: 'C:/Users/Admin/OneDrive/Desktop/Dandiya-night/.env' });

const MONGO_URI  = process.env.NEXT_PUBLIC_MONGO_URL;


async function connectDB() {
  try {
    const state = mongoose.connection.readyState;
    if(state == 1){
      console.log("already connected");
      return mongoose.connection;
    }
    await mongoose.connect(MONGO_URI);
    console.log()
    console.log('Successfully connected to MongoDB.');
  } catch (error) {
    console.error('MongoDB connection error:', error);
    process.exit(1); // Stop the application if the database connection fails
  }
}

const Shutdown = async (msg, callback) => {
  try {
    await mongoose.connection.close();
    console.log(`🔌 MongoDB connection closed through ${msg}`);
    callback();
  } catch (err) {
    console.error('Error during MongoDB disconnection:', err);
    process.exit(1);
  }
};

export default connectDB;