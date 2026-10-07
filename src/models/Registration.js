import mongoose from 'mongoose';

// 1. Define the Token Sub-Schema configuration
const TokenSchema = new mongoose.Schema({
  currentToken: { type: String },
  isFirstPhaseCompleted: { type: Boolean, default: true },
  isPhotoUploaded: { type: Boolean, default: false },
  isProfileFullyUpdated: { type: Boolean, default: false },
  isLoggedIn: { type: Boolean, default: false },
  
  // Fields needed for the email OTP validation steps
  tempOtp: { type: String, default: null },
  otpExpiresAt: { type: Date, default: null },
  
  updatedAt: { type: Date, default: Date.now },
});

// 2. Define your main User Schema
const UserSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
  },
  
  
  // 🔑 EMBED DIRECTLY: Pass the raw TokenSchema object here
  // DO NOT use mongoose.model('Token', TokenSchema) inside this path!
  tokenDetails: {
    type: TokenSchema,
    required: false,
  },
  
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// 3. Compile and export your userlog model cleanly for Next.js hot-reloads
export const userlog = mongoose.models.userlog || mongoose.model('userlog', UserSchema);

