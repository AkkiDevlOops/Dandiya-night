import mongoose from "mongoose";

const UserProfile = new mongoose.Schema({


  username: {
    type: String,
    required: true,
  },

  college: {
    type: String,
    required: true,
  },

  gender: {
    type: String,
    required: true,
  },

  email: {
    type: String,
    required: true,
  },

  branch: {
    type: String,
    required: true,
  },

  semester: {
    type: String,
    required: true,
  },

  // Optional fields for later
//   age: {
//     type: Number,
//   },

//   interests: {
//     type: [String],
//     default: [],
//   },

//   garbaVibe: {
//     type: String,
//   },

//   imageURL: {
//     type: [String],
//     default: [],
//   },

//   matchedUsers: {
//     type: [mongoose.Schema.Types.ObjectId],
//     ref: "User",
//     default: [],
//   },

  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Profile =
  mongoose.models.Profile ||
  mongoose.model("Profile", UserProfile);

export default Profile;