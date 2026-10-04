import 'dotenv/config'
import mongoose from "mongoose";
import User from "../../../models/user.js"
import connectDB from "../../../lib/db.js";

connectDB();

const enrollmentNo = '0101CS241016'


const getUser = async()=>{
     const existingUser = await User.find({ enrollmentNo:enrollmentNo });
     console.log(existingUser);
}

getUser();