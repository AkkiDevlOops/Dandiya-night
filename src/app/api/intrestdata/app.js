import mongoose from "mongoose";
import connectDB from "../../../lib/db.js";
import Profile from "../../../models/profile.js";

async function updatemongo(params) {
    await connectDB();
    await Profile.updateMany(
  { interests: { $exists: false } }, // Target only users missing the new fields
  { 
    $set: { 
      interests: [], 
      height: "", 
      prompt1: "", 
      prompt2: "" 
    } 
  }
);

}

updatemongo();