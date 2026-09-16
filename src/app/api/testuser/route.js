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
    "enrollmentNo": "0202111",
    "name": "girl 1",
    "program": "B.Tech Automobile Engineering",
    "programCode": "AU",
    "year": 1,
    "semester": 1,
    "section": null
  },
  {
    "enrollmentNo": "0202112",
    "name": "girl 2",
    "program": "B.Tech Automobile Engineering",
    "programCode": "AU",
    "year": 1,
    "semester": 1,
    "section": null
  },
  {
    "enrollmentNo": "0202113",
    "name": "girl 3",
    "program": "B.Tech Automobile Engineering",
    "programCode": "AU",
    "year": 1,
    "semester": 1,
    "section": null
  },
  {
    "enrollmentNo": "0202114",
    "name": "girl 4",
    "program": "B.Tech Automobile Engineering",
    "programCode": "AU",
    "year": 1,
    "semester": 1,
    "section": null
  },
  {
    "enrollmentNo": "0202115",
    "name": "girl 5",
    "program": "B.Tech Automobile Engineering",
    "programCode": "AU",
    "year": 1,
    "semester": 1,
    "section": null
  },
  {
    "enrollmentNo": "0201111",
    "name": "boy 1",
    "program": "B.Tech Automobile Engineering",
    "programCode": "AU",
    "year": 1,
    "semester": 1,
    "section": null
  },
  {
    "enrollmentNo": "0202112",
    "name": "boy 2",
    "program": "B.Tech Automobile Engineering",
    "programCode": "AU",
    "year": 1,
    "semester": 1,
    "section": null
  },
  {
    "enrollmentNo": "0202113",
    "name": "boy 3",
    "program": "B.Tech Automobile Engineering",
    "programCode": "AU",
    "year": 1,
    "semester": 1,
    "section": null
  },
  {
    "enrollmentNo": "0202114",
    "name": "boy 4",
    "program": "B.Tech Automobile Engineering",
    "programCode": "AU",
    "year": 1,
    "semester": 1,
    "section": null
  },
  {
    "enrollmentNo": "0202115",
    "name": "boy 5",
    "program": "B.Tech Automobile Engineering",
    "programCode": "AU",
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
