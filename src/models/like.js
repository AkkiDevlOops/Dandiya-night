import { Type } from "lucide-react";
import mongoose from "mongoose";

const likeschema = new mongoose.Schema({
    whoLiked : {
        type:String,
        require:true
    },
     whoLikedname: {
    type: String,
    required: true,
    },

    likedWhom: [{
    type: String,
  }],
})

const likes = mongoose.model("likes",likeschema);

export default likes;