import mongoose from "mongoose";

const songSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },

    artist: {
      type: String,
      default: "",
      trim: true,
    },

    genre: {
      type: String,
      default: "",
      trim: true,
    },

    // Supabase audio file
    audioUrl: {
      type: String,
      required: true,
    },

    // Supabase cover image
    coverUrl: {
      type: String,
      default: null,
    },

    // Useful if we want to delete files from Supabase later
    audioPath: {
      type: String,
      required: true,
    },

    coverPath: {
      type: String,
      default: null,
    },

    // Optional: useful for ordering songs
    isActive: {
      type: Boolean,
      default: true,
    },

    order: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

const Song =
  mongoose.models.Song || mongoose.model("Song", songSchema);

export default Song;