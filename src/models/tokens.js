import mongoose from "mongoose";

const tokenSchema = new mongoose.Schema({
    useId :{
        type: String,
        required: true,
    },
    username:{
        type: String,
        required: true,
    },
    setUpprofile:{
        type:Boolean,
        required: true,
    },
    createdAt: {
    type: Date,
    default: Date.now,
  },
});

const dbToken = mongoose.models.dbToken || mongoose.model("dbToken", tokenSchema);


export default dbToken;