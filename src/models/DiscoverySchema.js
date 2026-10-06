import mongoose from "mongoose";


const MatchSchema = new mongoose.Schema(
  {
    // The other user's Profile._id
    profileId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Profile",
      required: true,
    },

    // Other user's email
    email: {
      type: String,
      required: true,
      lowercase: true,
      trim: true,
    },

    // Other user's username
    username: {
      type: String,
      default: null,
    },

    // Other user's profile images
    images: {
      type: [String],
      default: [],
    },

    // When the match was created
    matchedAt: {
      type: Date,
      default: Date.now,
    },

    // Optional future status
    status: {
      type: String,
      enum: [
        "active",
        "unmatched",
      ],
      default: "active",
    },
  },
  {
    _id: true,
  }
);



const LikeSchema = new mongoose.Schema(
  {
    profileId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Profile",
      required: true,
    },

    targetType: {
      type: String,
      enum: ["profile", "photo", "prompt"],
      default: "profile",
    },

    targetId: {
      type: String,
      default: null,
    },

    comment: {
      type: String,
      default: "",
      maxlength: 500,
    },
     acknowledge: {
      type: Boolean,
      default: false,
    },

    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  { _id: true }
);

const LikedbySchema = new mongoose.Schema(
  {
    profileId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Profile",
      required: true,
    },

    targetType: {
      type: String,
      enum: ["profile", "photo", "prompt"],
      default: "profile",
    },

    targetId: {
      type: String,
      default: null,
    },
     targetIdphoto: {
      type: String,
      default: null,
    },
     targetIdName: {
      type: String,
      default: null,
    },
    comment: {
      type: String,
      default: "",
      maxlength: 500,
    },
     acknowledge: {
      type: Boolean,
      default: false,
    },

    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  { _id: true }
);

const DiscoverySchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      index: true,
    },

    // -----------------------------
    // DAILY LIKE LIMIT
    // -----------------------------
    likes: {
      count: {
        type: Number,
        default: 3,
        min: 0,
      },

      lastReset: {
        type: Date,
        default: Date.now,
      },
    },

    liked: {
      type: [LikeSchema],
      default: [],
    },

    skipped: {
      type: Array,
      default: [],
    },

    blocked: {
      type: Array,
      default: [],
    },

    reported: {
      type: Array,
      default: [],
    },

    likedBy: {
      type: [LikedbySchema],
      default: [],
    },

    matches: {
      type: [MatchSchema],
      default: [],
    },

    // -----------------------------
    // REPORTS RECEIVED BY THIS USER
    // -----------------------------
    reportsReceived: {
      count: {
        type: Number,
        default: 0,
        min: 0,
      },

      reports: {
        type: [
          {
            reporterId: {
              type: mongoose.Schema.Types.ObjectId,
              ref: "User",
            },

            reporterEmail: {
              type: String,
              lowercase: true,
              trim: true,
            },

            reason: {
              type: String,
              default: "",
              trim: true,
            },

            reportedAt: {
              type: Date,
              default: Date.now,
            },
          },
        ],
        default: [],
      },
    },
  },
  {
    timestamps: true,
  }
);


export default mongoose.models.Discovery ||
  mongoose.model("Discovery", DiscoverySchema);