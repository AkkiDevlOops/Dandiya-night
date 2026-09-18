import mongoose from "mongoose";


const likeschema = new mongoose.Schema({
    whoLiked : {
    type:String,
    required:true,
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