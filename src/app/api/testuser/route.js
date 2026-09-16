import mongoose from "mongoose";
import User from "../../../models/user.js"
import 'dotenv/config'


import connectDB from "../../../lib/db.js";



connectDB();

async function saveBatchUsers(payload) {
  try {
    // Extract the array of users from the single payload object
    const usersArray = [
  {
    "enrollmentNo": "0101EC241075",
    "name": "MADHUR PARE",
    "program": "B.Tech ECE",
    "programCode": "ECE",
    "year": 1,
    "semester": 1,
    "section": null
    
  },
]; 
    
    // Inserts all 3 objects at once into the collection
    const result = await User.insertMany(usersArray); 
    
    console.log(`${result.length} users saved successfully!`);
    return result;
  } catch (error) {
    console.error('Error saving batch users:', error);
    throw error;
  }
}

saveBatchUsers().then((result)=>console.log(result));
